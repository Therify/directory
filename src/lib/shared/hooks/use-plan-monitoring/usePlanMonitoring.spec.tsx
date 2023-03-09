import { usePlanMonitoring } from './usePlanMonitoring';
import { Mocks } from '../../types';
import { render } from '@testing-library/react';
import { URL_PATHS } from '@/lib/sitemap';
const routerMock = { pathname: '/test', push: jest.fn() };
jest.mock('next/router', () => {
    return {
        useRouter: () => routerMock,
    };
});

describe('usePlanMonitoring', () => {
    beforeEach(() => {
        routerMock.push.mockReset();
        routerMock.pathname = '/test';
    });

    describe('hasAccess', () => {
        it('should return hasAccess as true if plan is active', () => {
            let result = false;
            const TestJSX = () => {
                const { hasAccess } = usePlanMonitoring(Mocks.getTherifyUser());
                result = hasAccess;
                return <div />;
            };
            render(<TestJSX />);
            expect(result).toBe(true);
        });

        it('should return hasAccess as false if plan is inactive', () => {
            let result = true;
            const TestJSX = () => {
                const { hasAccess } = usePlanMonitoring(
                    Mocks.getTherifyUser({
                        plan: 'inactive',
                    })
                );
                result = hasAccess;
                return <div />;
            };
            render(<TestJSX />);
            expect(result).toBe(false);
        });

        it('should return hasAccess as false if plan is expired', () => {
            let result = true;
            const TestJSX = () => {
                const { hasAccess } = usePlanMonitoring(
                    Mocks.getTherifyUser({
                        plan: 'expired',
                    })
                );
                result = hasAccess;
                return <div />;
            };
            render(<TestJSX />);
            expect(result).toBe(false);
        });

        it('should return hasAccess as false if plan hasnt started', () => {
            let result = true;
            const TestJSX = () => {
                const { hasAccess } = usePlanMonitoring(
                    Mocks.getTherifyUser({
                        plan: 'future',
                    })
                );
                result = hasAccess;
                return <div />;
            };
            render(<TestJSX />);
            expect(result).toBe(false);
        });
    });
    it('should not re-direct if plan is active', () => {
        const TestJSX = () => {
            usePlanMonitoring(Mocks.getTherifyUser());
            return <div />;
        };
        render(<TestJSX />);
        expect(routerMock.push).not.toHaveBeenCalled();
    });

    describe('plan is expired', () => {
        it('should route to inactive plan page when plan is expired', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'member',
                        plan: 'expired',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.MEMBERS.ACCOUNT.EXPIRED_PLAN
            );
        });
        it('should route to billing when provider plan is expired', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'expired',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION
            );
        });
        it('should route to billing when practice owner plan is expired', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'practice-owner',
                        plan: 'expired',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION
            );
        });
        it('should not route to inactive plan page when already on member page with expired plan', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'member',
                        plan: 'expired',
                    })
                );
                return <div />;
            };
            routerMock.pathname = URL_PATHS.MEMBERS.ACCOUNT.EXPIRED_PLAN;
            render(<TestJSX />);
            expect(routerMock.push).not.toHaveBeenCalled();
        });
        it('should not route to billing when already on billing page with expired plan', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'expired',
                    })
                );
                return <div />;
            };
            routerMock.pathname =
                URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION;
            render(<TestJSX />);
            expect(routerMock.push).not.toHaveBeenCalled();
        });
    });

    describe('plan is not active', () => {
        it('should route to inactive plan page when plan is not active', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'member',
                        plan: 'inactive',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.MEMBERS.ACCOUNT.EXPIRED_PLAN
            );
        });
        it('should route to billing when provider plan is not active', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'inactive',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION
            );
        });
        it('should route to billing when practice owner plan is not active', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'practice-owner',
                        plan: 'inactive',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION
            );
        });
        it('should not route to inactive plan page when already on member page with non-active plan', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'member',
                        plan: 'inactive',
                    })
                );
                return <div />;
            };
            routerMock.pathname = URL_PATHS.MEMBERS.ACCOUNT.EXPIRED_PLAN;
            render(<TestJSX />);
            expect(routerMock.push).not.toHaveBeenCalled();
        });
        it('should not route to billing when already on billing page with non-active plan', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'inactive',
                    })
                );
                return <div />;
            };
            routerMock.pathname =
                URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION;
            render(<TestJSX />);
            expect(routerMock.push).not.toHaveBeenCalled();
        });
    });

    describe('plan access has not started', () => {
        it('should route member to countdown page when plan has not started', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'member',
                        plan: 'future',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.ACCESS_COUNTDOWN
            );
        });
        it('should route coach to countdown page when plan has not started', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'coach',
                        plan: 'future',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.ACCESS_COUNTDOWN
            );
        });
        it('should route therapist to countdown page when plan has not started', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'future',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.ACCESS_COUNTDOWN
            );
        });
        it('should route practice owner to countdown page when plan has not started', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'practice-owner',
                        plan: 'future',
                    })
                );
                return <div />;
            };
            render(<TestJSX />);
            expect(routerMock.push).toHaveBeenCalledWith(
                URL_PATHS.ACCESS_COUNTDOWN
            );
        });
        it('should not route to countdown when already on countdown page', () => {
            const TestJSX = () => {
                usePlanMonitoring(
                    Mocks.getTherifyUser({
                        type: 'therapist',
                        plan: 'future',
                    })
                );
                return <div />;
            };
            routerMock.pathname = URL_PATHS.ACCESS_COUNTDOWN;
            render(<TestJSX />);
            expect(routerMock.push).not.toHaveBeenCalled();
        });
    });
});
