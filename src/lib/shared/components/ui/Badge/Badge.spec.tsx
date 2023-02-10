import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { colors } from '../../themes/therify-design-system';
import { Badge, BADGE_COLOR, BADGE_SIZE, BADGE_TYPE, TEST_IDS } from './Badge';

describe('Badge', () => {
    it('renders badge text', () => {
        const { getByText } = renderWithTheme(<Badge>Badge</Badge>);
        expect(getByText('Badge')).toBeInTheDocument();
    });

    describe('Badge Icon', () => {
        const id = 'badge-icon';
        const mockIcon = <div data-testid={id} />;
        it('renders icon', () => {
            const { getByTestId } = renderWithTheme(
                <Badge icon={mockIcon}>Badge</Badge>
            );
            expect(getByTestId(id)).toBeInTheDocument();
        });

        it('renders badge icon with expected color', () => {
            const { getByTestId } = renderWithTheme(
                <Badge icon={mockIcon} color={BADGE_COLOR.PRIMARY}>
                    Badge
                </Badge>
            );
            expect(getByTestId(id)).toHaveStyle(`color: ${colors.shades[0]}`);
        });

        it('renders badge icon with expected size', () => {
            const { getByTestId } = renderWithTheme(
                <Badge icon={mockIcon} size={BADGE_SIZE.LARGE}>
                    Badge
                </Badge>
            );
            expect(getByTestId(id)).toHaveStyle('font-size: 0.875rem');
        });
    });

    describe('BADGE_COLOR', () => {
        it('defaults to primary badge', () => {
            const { getByTestId } = renderWithTheme(<Badge>Badge</Badge>);
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.primary[400]}; 
                color: ${colors.shades[0]}
            `);
        });
        it('renders primary badge', () => {
            const { getByTestId } = renderWithTheme(
                <Badge color={BADGE_COLOR.PRIMARY}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.primary[400]}; 
                color: ${colors.shades[0]}
            `);
        });

        it('renders primary light badge', () => {
            const { getByTestId } = renderWithTheme(
                <Badge color={BADGE_COLOR.PRIMARY_LIGHT}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.primary[50]}; 
                color: ${colors.primary[700]}
            `);
        });

        it('renders neutral badge', () => {
            const { getByTestId } = renderWithTheme(
                <Badge color={BADGE_COLOR.NEUTRAL}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.shades[100]}; 
                color: ${colors.shades[0]}
            `);
        });

        it('renders neutral light badge', () => {
            const { getByTestId } = renderWithTheme(
                <Badge color={BADGE_COLOR.NEUTRAL_LIGHT}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.neutral.black[100]}; 
                color: ${colors.shades[100]}
            `);
        });
    });

    describe('BadgeType', () => {
        it('defaults to filled badge', () => {
            const { getByTestId } = renderWithTheme(<Badge>Badge</Badge>);
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.primary[400]}; 
                color: ${colors.shades[0]}
            `);
        });

        it('renders contained badge', () => {
            const { getByTestId } = renderWithTheme(
                <Badge type={BADGE_TYPE.CONTAINED}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: ${colors.primary[400]}; 
                color: ${colors.shades[0]}
            `);
        });

        it('renders outlined badge', () => {
            const { getByTestId } = renderWithTheme(
                <Badge type={BADGE_TYPE.OUTLINED}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                background: transparent; 
                color: ${colors.primary[400]};
                border: 1px solid ${colors.primary[400]};
            `);
        });
    });

    describe('BadgeSize', () => {
        it('renders small badge', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Badge size={BADGE_SIZE.SMALL}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                font-size: 0.75rem;
                padding: ${theme.spacing(1)} ${theme.spacing(2)}
            `);
        });

        it('renders medium badge', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Badge size={BADGE_SIZE.MEDIUM}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                font-size: 0.875rem;
                padding: ${theme.spacing(1)} ${theme.spacing(3)}
            `);
        });

        it('defaults to medium badge', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Badge>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                font-size: 0.875rem;
                padding: ${theme.spacing(1)} ${theme.spacing(3)}
            `);
        });

        it('renders large badge', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Badge size={BADGE_SIZE.LARGE}>Badge</Badge>
            );
            expect(getByTestId(TEST_IDS.BADGE)).toHaveStyle(`
                font-size: 0.875rem;
                padding: ${theme.spacing(2)} ${theme.spacing(4)}
            `);
        });
    });
});
