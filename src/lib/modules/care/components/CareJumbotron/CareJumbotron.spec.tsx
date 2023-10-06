import { renderWithTheme } from '../../../../shared/components/fixtures/renderWithTheme';
import { CareJumbotron, CareJumbotronProps } from './CareJumbotron';

const routerMock = { pathname: '/test', push: jest.fn() };
jest.mock('next/router', () => {
    return {
        useRouter: () => routerMock,
    };
});

describe('CareJumbotron', () => {
    it('should render', () => {
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
    it('should render \'has provider recommendations\' message when there are recommendations for review', () => {
        const { getByText } = renderWithTheme(
        <CareJumbotron
            isAwaitingRecommendations={false}
            hasRecommendationsForReview={true}
            hasCareTeam={false}
        />
        );
        const header = getByText('You\'ve got Provider Recommendations!');
        expect(header).toBeVisible();
    });
    it('should render \'has provider recommendations\' message when there are recommendations for review, overriding other props', () => {
        const { getByText } = renderWithTheme(
        <CareJumbotron
            isAwaitingRecommendations={true}
            hasRecommendationsForReview={true}
            hasCareTeam={true}
        />
        );
        const header = getByText('You\'ve got Provider Recommendations!');
        expect(header).toBeVisible();
    });
    it('should render \'build care team\' message when \'hasCareTeam\' prop is true', () => {
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
    it('should render \'build care team\' message when \'hasCareTeam\' prop is true, overriding \'awaiting recommendations\' prop', () => {
        const { getByText } = renderWithTheme(
        <CareJumbotron
            isAwaitingRecommendations={true}
            hasRecommendationsForReview={false}
            hasCareTeam={true}
        />
        );
        const header = getByText('Build your Care Team!');
        expect(header).toBeVisible();
    });
    it('should render \'looking for providers\' message when awaiting recommendations', () => {
        const { getByText } = renderWithTheme(
        <CareJumbotron
            isAwaitingRecommendations={true}
            hasRecommendationsForReview={false}
            hasCareTeam={false}
        />
        );
        const header = getByText('We\'re looking for providers to recommend!');
        expect(header).toBeVisible();
    });
    it('should render \'{name} is looking for providers\' message when awaiting recommendations from a specific care navigator', () => {
        const { getByText } = renderWithTheme(
        <CareJumbotron
            isAwaitingRecommendations={true}
            hasRecommendationsForReview={false}
            hasCareTeam={false}
            careNavigatorName='Dr. Test'
        />
        );
        const header = getByText('Dr. Test is looking for providers to recommend!');
        expect(header).toBeVisible();
    });
});
