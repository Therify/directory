import { renderWithTheme } from '@/lib/shared/components/fixtures/renderWithTheme';
import { Mocks } from '@/lib/shared/types';
import { useInAppNotificationDrawer } from '@/lib/modules/notifications/components/hooks';
import { ProviderBillingPageView } from './BillingPageView';
import { TEST_IDS } from './ui';
import { format } from 'date-fns';
jest.mock('@/lib/modules/notifications/components/hooks', () => {
    return {
        useInAppNotificationDrawer: jest.fn(),
    };
});
jest.mock('next/router', () => {
    return {
        useRouter: () => ({ pathname: '/test', push: jest.fn() }),
    };
});

describe('BillingPage', () => {
    const currentPath = '/billing';
    beforeEach(() => {
        (useInAppNotificationDrawer as jest.Mock).mockReturnValue({
            notifications: [],
            clearNotifications: jest.fn(),
            clearActionlessNotifications: jest.fn(),
            drawer: {
                isOpen: false,
                close: jest.fn(),
                open: jest.fn(),
            },
            unreadCount: 0,
            handleAction: jest.fn(),
            getNotificationsMapForMenu: () => ({}),
            getNotificationCountForPath: jest.fn(),
        });
    });

    it('renders', () => {
        expect(
            renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'therapist',
                    })}
                    stripeCustomerPortalUrl={null}
                />
            )
        ).toBeDefined();
    });

    const inactivePlanAlertTitle = 'Your plan is not active.';
    describe('Practice Owner', () => {
        const stripeButtonText = 'Launch Stripe Customer Portal';
        const missingStripeUrlAlertText =
            'Stripe customer portal URL is not configured. Please reach out to Therify support.';
        const invalidPlanAlertMessage =
            'Please update your billing information with Stripe to continue using Therify.';
        it('should render practice owner billing page', () => {
            const { queryByTestId } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'practice-owner',
                    })}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(
                queryByTestId(TEST_IDS.PRACTICE_ADMIN_BILLING_VIEW)
            ).toBeInTheDocument();
            expect(queryByTestId(TEST_IDS.PROVIDER_BILLING_VIEW)).toBeNull();
        });

        it('should render stripe button', () => {
            const { getByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'practice-owner',
                    })}
                    stripeCustomerPortalUrl={'therify.co'}
                />
            );
            expect(getByText(stripeButtonText)).toBeVisible();
        });
        it('should render stripe alert when checkout url is missing', () => {
            const { getByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'practice-owner',
                    })}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(getByText(missingStripeUrlAlertText)).toBeVisible();
        });

        it('should show expired plan alert', () => {
            const mockUser = Mocks.getTherifyUser({
                type: 'practice-owner',
                plan: 'expired',
            });
            const expiredPlanAlertTitle = `Your plan expired on ${format(
                new Date(mockUser.plan!.endDate),
                'MMMM do, yyyy'
            )}.`;
            const { getByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={mockUser}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(getByText(expiredPlanAlertTitle)).toBeVisible();
            expect(getByText(invalidPlanAlertMessage)).toBeVisible();
        });
        it('should show inactive plan alert', () => {
            const { getByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'practice-owner',
                        plan: 'inactive',
                    })}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(getByText(inactivePlanAlertTitle)).toBeVisible();
            expect(getByText(invalidPlanAlertMessage)).toBeVisible();
        });
        it('should not show alerts when plan is valid', () => {
            const { queryByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'practice-owner',
                        plan: 'active',
                    })}
                    stripeCustomerPortalUrl={'stripe.com'}
                />
            );
            [
                inactivePlanAlertTitle,
                missingStripeUrlAlertText,
                invalidPlanAlertMessage,
            ].forEach((text) => {
                expect(queryByText(text)).toBeNull();
            });
        });
    });

    describe('Provider', () => {
        const invalidPlanAlertMessage =
            'Please reach out to your practice administrator to update your billing information.';
        it('should render provider billing page', () => {
            const { queryByTestId } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'therapist',
                    })}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(
                queryByTestId(TEST_IDS.PRACTICE_ADMIN_BILLING_VIEW)
            ).toBeNull();
            expect(
                queryByTestId(TEST_IDS.PROVIDER_BILLING_VIEW)
            ).toBeInTheDocument();
        });

        it('should show expired plan alert', () => {
            const mockUser = Mocks.getTherifyUser({
                type: 'therapist',
                plan: 'expired',
            });
            const expiredPlanAlertTitle = `Your plan expired on ${format(
                new Date(mockUser.plan!.endDate),
                'MMMM do, yyyy'
            )}.`;
            const { getByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={mockUser}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(getByText(expiredPlanAlertTitle)).toBeVisible();
            expect(getByText(invalidPlanAlertMessage)).toBeVisible();
        });
        it('should show inactive plan alert', () => {
            const { getByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'inactive',
                    })}
                    stripeCustomerPortalUrl={null}
                />
            );
            expect(getByText(inactivePlanAlertTitle)).toBeVisible();
            expect(getByText(invalidPlanAlertMessage)).toBeVisible();
        });
        it('should not show alerts when plan is valid', () => {
            const { queryByText } = renderWithTheme(
                <ProviderBillingPageView
                    currentPath={currentPath}
                    user={Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'active',
                    })}
                    stripeCustomerPortalUrl={'stripe.com'}
                />
            );
            [inactivePlanAlertTitle, invalidPlanAlertMessage].forEach(
                (text) => {
                    expect(queryByText(text)).toBeNull();
                }
            );
        });
    });
});
