import { Plan } from '@prisma/client';

export const getPlanByDate = (plans: Plan[], date: Date) => {
    return plans.find((plan) => {
        const { startDate, endDate } = plan;
        return startDate <= date && endDate >= date;
    });
};

export const getCurrentPlan = (plans: Plan[]) => {
    if (plans.length === 0) {
        return null;
    }

    if (plans.length === 1) {
        return plans[0];
    }

    return getPlanByDate(plans, new Date()) ?? null;
};
