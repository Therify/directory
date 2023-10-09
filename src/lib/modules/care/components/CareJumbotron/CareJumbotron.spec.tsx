import { renderWithTheme } from '@/lib/shared/components/fixtures/renderWithTheme';
import { CareJumbotron } from './CareJumbotron';

const routerMock = { pathname: '/test', push: jest.fn() };
jest.mock('next/router', () => {
    return {
        useRouter: () => routerMock,
    };
});

describe('CareJumbotron', () => {
    describe('hasRecommendationsForReview', () => {
        it('should render message when there are recommendations for review', () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    hasRecommendationsForReview={true}
                    isAwaitingRecommendations={false}
                    hasCareTeam={false}
                />
            );
            const header = getByText("You've got Provider Recommendations!");
            expect(header).toBeVisible();
        });
        it('should override all other messages', () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    hasRecommendationsForReview={true}
                    isAwaitingRecommendations={true}
                    hasCareTeam={true}
                />
            );
            const header = getByText("You've got Provider Recommendations!");
            expect(header).toBeVisible();
        });
    });
    describe('isAwaitingRecommendations', () => {
        it('should render message when awaiting recommendations', () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    isAwaitingRecommendations={true}
                    hasRecommendationsForReview={false}
                    hasCareTeam={false}
                />
            );
            const header = getByText(
                "We're looking for providers to recommend!"
            );
            expect(header).toBeVisible();
        });
        it("should render '{name} is looking for providers' message when awaiting recommendations from a specific care navigator", () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    isAwaitingRecommendations={true}
                    hasRecommendationsForReview={false}
                    hasCareTeam={false}
                    careNavigatorName="Dr. Test"
                />
            );
            const header = getByText(
                'Dr. Test is looking for providers to recommend!'
            );
            expect(header).toBeVisible();
        });
        it("should override 'build care team' message", () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    isAwaitingRecommendations={true}
                    hasRecommendationsForReview={false}
                    hasCareTeam={true}
                />
            );
            const header = getByText(
                "We're looking for providers to recommend!"
            );
            expect(header).toBeVisible();
        });
    });
    describe('hasCareTeam', () => {
        it("should render message when 'hasCareTeam' prop is true", () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    isAwaitingRecommendations={false}
                    hasRecommendationsForReview={false}
                    hasCareTeam={true}
                />
            );
            const header = getByText('Build your Care Team!');
            expect(header).toBeVisible();
        });
    });
    describe('default message', () => {
        it("should default to 'Get Matched' message", () => {
            const { getByText } = renderWithTheme(
                <CareJumbotron
                    isAwaitingRecommendations={false}
                    hasRecommendationsForReview={false}
                    hasCareTeam={false}
                />
            );
            const header = getByText('Get matched with your first Provider!');
            expect(header).toBeVisible();
        });
    });
});
