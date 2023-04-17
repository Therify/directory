import { ProviderProfile } from '@/lib/shared/types';
import { MemberProfile } from '@/lib/shared/types/member-profile';
import { GenerateRecommendations } from '../../features';
import { DirectoryServiceParams } from '../params';
import { findConcernMatches } from './find-concern-matches';
import { findEligibleProviders } from './find-eligible-matches/findEligibleProviders';
import { findEthnicMatches } from './find-ethnic-matches';
import { findGenderMatches } from './find-gender-matches';
import { findIdealMatches } from './find-ideal-matches';
import { RecommendedProviderProfile } from '@/lib/shared/types/provider-profile/recommended-provider-profile';
import { ProfileType } from '@prisma/client';

interface GenerateRecommendationsParams extends DirectoryServiceParams {}

/**
 *  Sorts the provider profiles by score
 * @param a
 * @param b
 * @returns
 */
function sortByScore(
    a: RecommendedProviderProfile.RecommendedProviderProfile,
    b: RecommendedProviderProfile.RecommendedProviderProfile
) {
    return a.score - b.score;
}

export const factory = ({ prisma }: GenerateRecommendationsParams) => {
    return async function generateRecommendations({
        memberId,
        selfAssessment,
    }: GenerateRecommendations.Input): Promise<GenerateRecommendations.Output> {
        const { account } = await prisma.user.findUniqueOrThrow({
            where: {
                id: memberId,
            },
            select: {
                account: {
                    select: {
                        plans: {
                            orderBy: {
                                createdAt: 'desc',
                            },
                            take: 1,
                            where: {
                                status: 'active',
                                startDate: {
                                    lte: new Date(),
                                },
                                endDate: {
                                    gte: new Date(),
                                },
                            },
                        },
                    },
                },
            },
        });
        const [plan] = account?.plans ?? [undefined];
        const hasTherapyAccess = !!plan && plan.seats > 1;
        const isAtRisk =
            selfAssessment.phq9Score > 14 ||
            selfAssessment.isInCrisis ||
            selfAssessment.hasSuicidalIdeation;

        const [rawMemberProfile, rawProviderProfiles] = await Promise.all([
            prisma.memberProfile.findUnique({
                where: {
                    userId: memberId,
                },
            }),
            prisma.providerProfile.findMany({
                where: {
                    designation: {
                        in: [
                            ...(hasTherapyAccess
                                ? [ProfileType.therapist]
                                : []),
                            ...(!isAtRisk ? [ProfileType.coach] : []),
                        ],
                    },
                    newClientStatus: 'accepting',
                    directoryListing: {
                        status: 'listed',
                    },
                    connectionRequests: {
                        none: {
                            memberId,
                        },
                    },
                },
            }),
        ]);
        if (!rawMemberProfile)
            return {
                success: false,
                error: 'Member profile not found',
            };
        if (!rawProviderProfiles)
            return {
                success: false,
                error: 'Provider profiles not found',
            };
        const memberProfile = MemberProfile.validate(rawMemberProfile);
        const providerProfiles = rawProviderProfiles.map(
            ProviderProfile.validate
        );
        const { recommendations } = findEligibleProviders(
            memberProfile,
            providerProfiles
        );
        return {
            success: true,
            payload: {
                idealMatches: findIdealMatches(selfAssessment, recommendations)
                    .sort(sortByScore)
                    .slice(0, 3),
                ethnicMatches: findEthnicMatches(
                    selfAssessment,
                    recommendations
                ).slice(0, 3),
                genderMatches: findGenderMatches(
                    selfAssessment,
                    recommendations
                ).slice(0, 3),
                concernsMatches: findConcernMatches(
                    selfAssessment,
                    recommendations
                ).slice(0, 3),
            },
        };
    };
};
