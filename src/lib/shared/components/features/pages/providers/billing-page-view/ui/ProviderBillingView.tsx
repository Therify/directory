import { Box } from '@mui/material';
import { TherifyUser } from '@/lib/shared/types';
import { Paragraph, H3 } from '@/lib/shared/components/ui';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages';
import { PlanAlert } from './PlanAlert';
import { TEST_IDS } from './testIds';

export const ProviderBillingView = ({
    user,
    isPlanExpired,
    isPlanActive,
    currentPath,
}: {
    user: TherifyUser.TherifyUser;
    isPlanExpired: boolean;
    isPlanActive: boolean;
    currentPath: string;
}) => {
    return (
        <ProviderNavigationPage currentPath={currentPath} user={user}>
            <Box data-testid={TEST_IDS.PROVIDER_BILLING_VIEW} padding={4}>
                {(isPlanExpired || !isPlanActive) && user && (
                    <Box marginBottom={4}>
                        <PlanAlert
                            showExpiredMessage={isPlanExpired}
                            endDate={user.plan?.endDate}
                            message="Please reach out to your practice administrator to update your billing information."
                        />
                    </Box>
                )}
                <H3>Billing and Subscription</H3>
                <Paragraph>
                    Your billing is handled by your practice administrator.
                    Please contact them for any billing questions.
                </Paragraph>
            </Box>
        </ProviderNavigationPage>
    );
};
