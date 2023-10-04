import { renderWithTheme } from '../../../../shared/components/fixtures/renderWithTheme';
import { CareJumbotron, CareJumbotronProps, TEST_IDS } from './CareJumbotron';

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
            hasCompletedSelfAssessment={false}
            hasRecommendationsForReview={false}
            hasCareTeam={false}
        />
        );
        const container = getByText('Get matched with your first Provider!');
        expect(container).toBeVisible();
    });
    it('should render the text that matches the props', () => {
        const propsMessageMap: { props: CareJumbotronProps, message: string }[] = [
            {
                props: {
                    hasCompletedSelfAssessment: true,
                    hasRecommendationsForReview: true,
                    hasCareTeam: true,
                },
                message: 'Build your Care Team!',
            },
            {
                props: {
                    hasCompletedSelfAssessment: true,
                    hasRecommendationsForReview: true,
                    hasCareTeam: false,
                },
                message: 'You\'ve got Provider Recommendations!',
            },
            {
                props: {
                    hasCompletedSelfAssessment: true,
                    hasRecommendationsForReview: false,
                    hasCareTeam: false,
                },
                message: 'We\'re looking for providers to recommend!',
            },
            {
                props: {
                    hasCompletedSelfAssessment: true,
                    hasRecommendationsForReview: false,
                    hasCareTeam: false,
                    careNavigatorName: 'Dr. Test',
                },
                message: 'Dr. Test is looking for providers to recommend!',
            },
        ]
        propsMessageMap.forEach(({ props, message }) => {
            let { getByText } = renderWithTheme(
                <CareJumbotron {...props} />
            );
            const header = getByText(message);
            expect(header).toBeVisible();
        });
    });
});
