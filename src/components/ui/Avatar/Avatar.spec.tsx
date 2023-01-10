import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { colors } from '../../themes/therify-design-system';
import { Avatar, AVATAR_SIZE, AVATAR_COLOR, TEST_IDS } from './index';

describe('Avatar', () => {
    const mockSrc = 'test.jpg';
    it('renders avatar image', () => {
        const { getByAltText } = renderWithTheme(
            <Avatar src={mockSrc} alt="avatar image" />
        );
        const avatar = getByAltText('avatar image');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', mockSrc);
    });

    it('renders icon', () => {
        const { getByTestId } = renderWithTheme(<Avatar />);
        expect(getByTestId(TEST_IDS.ICON)).toBeInTheDocument();
    });

    it('does not render icon when image src present', () => {
        const { queryByTestId } = renderWithTheme(<Avatar src={mockSrc} />);
        expect(queryByTestId(TEST_IDS.ICON)).not.toBeInTheDocument();
    });

    it('does not render icon when hideIcon present', () => {
        const { queryByTestId } = renderWithTheme(<Avatar hideIcon />);
        expect(queryByTestId(TEST_IDS.ICON)).not.toBeInTheDocument();
    });

    it('applies size to avatar', () => {
        const { getByTestId, theme } = renderWithTheme(
            <Avatar src={mockSrc} alt="avatar image" size={AVATAR_SIZE.LARGE} />
        );
        const avatar = getByTestId(TEST_IDS.AVATAR);
        expect(avatar).toHaveStyle(
            `width: ${theme.spacing(
                AVATAR_SIZE.LARGE
            )}; height: ${theme.spacing(AVATAR_SIZE.LARGE)}`
        );
    });

    describe('AVATAR_COLOR', () => {
        const avatarColors = [
            AVATAR_COLOR.PRIMARY,
            AVATAR_COLOR.SECONDARY_BLUE,
            AVATAR_COLOR.SECONDARY_ORANGE,
            AVATAR_COLOR.SECONDARY_PURPLE,
            AVATAR_COLOR.SECONDARY_PEACH,
            AVATAR_COLOR.SECONDARY_PEACH,
        ];
        test.each(avatarColors)('applies color %s to avatar', (color) => {
            const { getByTestId } = renderWithTheme(
                <Avatar src={mockSrc} alt="avatar image" color={color} />
            );
            const avatar = getByTestId(TEST_IDS.AVATAR);
            const palette =
                color === AVATAR_COLOR.PRIMARY
                    ? colors.primary
                    : colors.secondary[color];
            expect(avatar).toHaveStyle(`background-color: ${palette[50]};`);
        });
    });
});
