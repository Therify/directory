import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { Role } from '@prisma/client';
import { HandleStripeConnectOnboardingTransaction } from './definition';

interface GetTherifyUserDetailsFactory {
    (
        params: HandleStripeConnectOnboarding.Input
    ): HandleStripeConnectOnboardingTransaction['getUserDetails'];
}

export const factory: GetTherifyUserDetailsFactory = ({ userId }) => ({
    async commit({ prisma }) {
        const { stripeConnectAccountId, providerProfile, roles, ...user } =
            await prisma.user.findUniqueOrThrow({
                where: { id: userId },
                select: {
                    givenName: true,
                    surname: true,
                    emailAddress: true,
                    stripeConnectAccountId: true,
                    dateOfBirth: true,
                    roles: true,
                    providerProfile: {
                        select: {
                            id: true,
                            minimumRate: true,
                            givenName: true,
                            surname: true,
                            practiceProfile: {
                                select: {
                                    practice: {
                                        select: {
                                            id: true,
                                            practiceOwner: {
                                                select: {
                                                    emailAddress: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        // if (stripeConnectAccountId) {
        //     throw new Error('User already has a Stripe Connect Account ID.');
        // }
        const ownerEmail =
            providerProfile?.practiceProfile?.practice?.practiceOwner
                ?.emailAddress;
        const practiceOwnerEmailDomain = ownerEmail?.split('@')[1];
        const canCreateAccount =
            roles.includes(Role.provider_coach) &&
            practiceOwnerEmailDomain === 'therify.co';
        if (!canCreateAccount) {
            throw new Error('User cannot create a Stripe Connect Account.');
        }
        if (!providerProfile) {
            throw new Error('Missing provider profile.');
        }
        return {
            user,
            sessionRate: providerProfile.minimumRate,
            providerProfile: {
                id: providerProfile.id,
                givenName: providerProfile.givenName,
                surname: providerProfile.surname,
                minimumRate: providerProfile.minimumRate,
            },
            stripeConnectAccountId: stripeConnectAccountId ?? undefined,
        };
    },
    async rollback() {
        return;
    },
});
