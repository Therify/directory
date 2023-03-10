import { TherifyUser } from '@/lib/shared/types';
import { URL_PATHS } from '@/lib/sitemap';
import { PlanStatus, Role } from '@prisma/client';
import { isAfter } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const INVALID_PLAN_ROUTES = [
    URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION,
    URL_PATHS.MEMBERS.ACCOUNT.INVALID_PLAN,
];

export const usePlanMonitoring = (
    user: TherifyUser.TherifyUser | null | undefined
) => {
    const router = useRouter();
    const isPlanExpired =
        !!user?.plan?.endDate &&
        isAfter(new Date(), new Date(user.plan.endDate));
    const hasPlanStarted =
        !!user?.plan?.startDate &&
        isAfter(new Date(), new Date(user.plan.startDate));
    const isPlanActive =
        user &&
        (user?.plan?.status === PlanStatus.active ||
            user?.plan?.status === PlanStatus.trialing);

    useEffect(() => {
        if (!user?.roles) return;

        if (!hasPlanStarted && router.pathname !== URL_PATHS.ACCESS_COUNTDOWN) {
            router.push(URL_PATHS.ACCESS_COUNTDOWN);
        } else if (
            (isPlanExpired || !isPlanActive) &&
            !INVALID_PLAN_ROUTES.includes(router.pathname)
        ) {
            const invalidPath = user.roles.includes(Role.member)
                ? URL_PATHS.MEMBERS.ACCOUNT.INVALID_PLAN
                : URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION;
            router.push(invalidPath);
        }
    }, [hasPlanStarted, isPlanExpired, isPlanActive, router, user?.roles]);
    return {
        hasAccess: Boolean(hasPlanStarted && isPlanActive && !isPlanExpired),
    };
};
