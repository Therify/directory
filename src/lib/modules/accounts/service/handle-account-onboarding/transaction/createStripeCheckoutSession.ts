import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';
import {
    getProductsByEnvironment,
    PRODUCTS as PRODUCT_KEYS,
} from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';
import { URL_PATHS } from '@/lib/sitemap';

import { HandleAccountOnboardingTransaction } from './definition';

const PRODUCTS = getProductsByEnvironment(
    process.env.NEXT_PUBLIC_VERCEL_ENV as NodeEnvironment
);

export const factory = ({
    planType,
    billingCycle,
    seatCount,
    coveredSessions,
}: HandleAccountOnboarding.Input): HandleAccountOnboardingTransaction['createStripeCheckoutSession'] => ({
    async commit({ stripe }, { getUserDetails: { stripeCustomerId } }) {
        let priceId = getPriceId({
            seatCount,
            planType,
            billingCycle,
        });

        if (!priceId) {
            throw new Error(
                'No price id found for plan type and billing cycle.'
            );
        }
        const membership = {
            priceId,
            quantity: seatCount,
        };
        const coveredCoachingSessions = {
            priceId:
                PRODUCTS[PRODUCT_KEYS.COVERED_COACHING_SESSION].PRICES.DEFAULT,
            quantity: coveredSessions * seatCount,
        };

        const { url: checkoutSessionUrl, id: checkoutSessionId } =
            await stripe.createCheckoutSession({
                lineItems: [
                    membership,
                    ...(coveredSessions > 0 ? [coveredCoachingSessions] : []),
                ],
                customerId: stripeCustomerId,
                checkoutMode: 'subscription',
                cancelUrl: `${process.env.APPLICATION_URL}${URL_PATHS.ACCOUNT_OWNER.ONBOARDING.BILLING}`,
                successUrl: `${process.env.APPLICATION_URL}${URL_PATHS.ACCOUNT_OWNER.ONBOARDING.BILLING_SUCCESS}`,
                allowPromotionCodes: true,
                metadata: {
                    priceId,
                },
            });
        if (!checkoutSessionUrl) {
            throw new Error('No session URL returned from Stripe.');
        }
        return {
            checkoutSessionId,
            checkoutSessionUrl,
        };
    },
    async rollback(
        { stripe },
        { createStripeCheckoutSession: { checkoutSessionId: sessionId } }
    ) {
        return stripe.expireCheckoutSession({ sessionId });
    },
});

function getPriceId({
    seatCount,
    planType,
    billingCycle,
}: {
    seatCount: HandleAccountOnboarding.Input['seatCount'];
    planType: HandleAccountOnboarding.Input['planType'];
    billingCycle: HandleAccountOnboarding.Input['billingCycle'];
}) {
    if (planType === 'individual') {
        if (seatCount !== 1)
            throw new Error('Individual plan must only have 1 seat.');

        return getIndividualPlanPriceId(billingCycle);
    }
    if (planType === 'team') {
        if (seatCount < 2)
            throw new Error('Team plan must have at least 2 seats.');
        if (seatCount > 50)
            throw new Error(
                'Team plan cannot have more than 50 seats. Please contact us for an Enterprise plan.'
            );
        return getTeamPlanPriceId(
            billingCycle as Exclude<
                HandleAccountOnboarding.Input['billingCycle'],
                'month'
            >
        );
    }
    return undefined;
}

function getIndividualPlanPriceId(
    billingCycle: HandleAccountOnboarding.Input['billingCycle']
) {
    switch (billingCycle) {
        case 'month':
            return PRODUCTS[PRODUCT_KEYS.INDIVIDUAL_MEMBER_PLAN].PRICES.MONTHLY;
        case 'biannual':
            return PRODUCTS[PRODUCT_KEYS.INDIVIDUAL_MEMBER_PLAN].PRICES
                .BIANNUAL;
        case 'annual':
            return PRODUCTS[PRODUCT_KEYS.INDIVIDUAL_MEMBER_PLAN].PRICES.ANNUAL;
        default:
            throw new Error('Invalid individual plan billing cycle');
    }
}
function getTeamPlanPriceId(
    billingCycle: Exclude<
        HandleAccountOnboarding.Input['billingCycle'],
        'month'
    >
) {
    switch (billingCycle) {
        case 'biannual':
            return PRODUCTS[PRODUCT_KEYS.GROUP_MEMBER_PLAN].PRICES.BIANNUAL;
        case 'annual':
            return PRODUCTS[PRODUCT_KEYS.GROUP_MEMBER_PLAN].PRICES.ANNUAL;
        default:
            throw new Error('Invalid team plan billing cycle');
    }
}
