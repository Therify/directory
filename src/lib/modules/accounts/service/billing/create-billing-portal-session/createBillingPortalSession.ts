import { CreateBillingPortalSession } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';
import { StripeBillingPortalConfig } from '@/lib/shared/vendors/stripe';
import { NodeEnvironment } from '@/lib/shared/types';
import { Role } from '@prisma/client';

const CONFIGURATIONS = StripeBillingPortalConfig.getConfigsByEnvironment(
    process.env.VERCEL_ENV as NodeEnvironment
);

export const factory =
    ({ prisma, stripe }: AccountsServiceParams) =>
    async ({
        userId,
        returnUrl,
    }: CreateBillingPortalSession.Input): Promise<{
        billingPortalSessionId: Exclude<
            CreateBillingPortalSession.Output['billingPortalSessionId'],
            null
        >;
        billingPortalSessionUrl: Exclude<
            CreateBillingPortalSession.Output['billingPortalSessionUrl'],
            null
        >;
    }> => {
        const { roles, managedAccount, managedPractice, stripeCustomerId } =
            await prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
                },
                select: {
                    roles: true,
                    stripeCustomerId: true,
                    managedPractice: true,
                    managedAccount: true,
                },
            });

        let configurationId: string | undefined;
        if (!stripeCustomerId) {
            throw new Error('No stripe customer id found for user');
        }
        if (managedPractice) {
            configurationId =
                CONFIGURATIONS[StripeBillingPortalConfig.CONFIGS.PRACTICE_ADMIN]
                    .CONFIGURATION_ID;
        } else if (managedAccount) {
            configurationId =
                CONFIGURATIONS[StripeBillingPortalConfig.CONFIGS.ACCOUNT_ADMIN]
                    .CONFIGURATION_ID;
        } else if (roles.includes(Role.member)) {
            configurationId =
                CONFIGURATIONS[StripeBillingPortalConfig.CONFIGS.MEMBER]
                    .CONFIGURATION_ID;
        }

        if (!configurationId) {
            throw new Error('No billing portal configuration found for user');
        }
        const { billingPortalSessionId, billingPortalSessionUrl } =
            await stripe.createBillingPortalSession({
                customerId: stripeCustomerId,
                configurationId,
                returnUrl,
            });
        return {
            billingPortalSessionId,
            billingPortalSessionUrl,
        };
    };
