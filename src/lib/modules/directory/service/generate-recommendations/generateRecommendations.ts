import { ProviderProfile } from '@/lib/shared/types';
import { MemberProfile } from '@/lib/shared/types/member-profile';
import { GenerateRecommendations } from '../../features';
import { DirectoryServiceParams } from '../params';
import { findConcernMatches } from './find-concern-matches';
import { findEligibleProviders } from './find-eligible-matches/findEligibleProviders';
import { findEthnicMatches } from './find-ethnic-matches';
import { findGenderMatches } from './find-gender-matches';
import { findIdealMatches } from './find-ideal-matches';

interface GenerateRecommendationsParams extends DirectoryServiceParams {}

export const factory = ({ prisma }: GenerateRecommendationsParams) => {
    return async function generateRecommendations({
        memberId,
        selfAssessment,
    }: GenerateRecommendations.Input): Promise<GenerateRecommendations.Output> {
        const [rawMemberProfile, rawProviderProfiles] = await Promise.all([
            prisma.memberProfile.findUnique({
                where: {
                    userId: memberId,
                },
            }),
            prisma.providerProfile.findMany({
                where: {
                    newClientStatus: 'accepting',
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
        const { therapists, coaches } = findEligibleProviders(
            memberProfile,
            providerProfiles
        );
        return {
            success: true,
            payload: {
                coaches,
                idealMatches: findIdealMatches(
                    selfAssessment,
                    therapists
                ).slice(0, 3),
                ethnicMatches: findEthnicMatches(
                    selfAssessment,
                    therapists
                ).slice(0, 3),
                genderMatches: findGenderMatches(
                    selfAssessment,
                    therapists
                ).slice(0, 3),
                concernsMatches: findConcernMatches(
                    selfAssessment,
                    therapists
                ).slice(0, 3),
            },
        };
    };
};
