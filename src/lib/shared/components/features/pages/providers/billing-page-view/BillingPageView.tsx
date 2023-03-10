import { isAfter } from 'date-fns';
import { TherifyUser } from '@/lib/shared/types';
import { PlanStatus } from '@prisma/client';
import { PracticeAdminBillingView, ProviderBillingView } from './ui';

interface ProviderBillingPageViewProps {
    user: TherifyUser.TherifyUser;
    stripeCustomerPortalUrl: string | null;
    currentPath: string;
}

export const ProviderBillingPageView = ({
    user,
    stripeCustomerPortalUrl,
    currentPath,
}: ProviderBillingPageViewProps) => {
    const isPlanExpired =
        !!user?.plan?.endDate &&
        isAfter(new Date(), new Date(user.plan.endDate));
    const isPlanActive =
        user &&
        (user?.plan?.status === PlanStatus.active ||
            user?.plan?.status === PlanStatus.trialing);
    return (
        <>
            {user?.isPracticeAdmin ? (
                <PracticeAdminBillingView
                    currentPath={currentPath}
                    stripeCustomerPortalUrl={stripeCustomerPortalUrl}
                    isPlanExpired={isPlanExpired}
                    isPlanActive={isPlanActive}
                    user={user}
                />
            ) : (
                <ProviderBillingView
                    currentPath={currentPath}
                    user={user}
                    isPlanExpired={isPlanExpired}
                    isPlanActive={isPlanActive}
                />
            )}
        </>
    );
};
