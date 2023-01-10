import { fireEvent, render } from '@testing-library/react';

import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { ListItemOld, TEST_IDS } from './ListItemOld';

describe('List Item', () => {
    it('renders title text', () => {
        const { getByText } = render(<ListItemOld title="Title" />);
        expect(getByText('Title')).toBeVisible();
    });

    describe('Body Text', () => {
        it('renders body text', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <ListItemOld title="Title" bodyText="Body text" />
            );
            expect(getByTestId(TEST_IDS.BODY_TEXT)).toBeInTheDocument();
            expect(getByText('Body text')).toBeVisible();
        });

        it("doesn't render when body text not provided", () => {
            const { queryByTestId } = renderWithTheme(
                <ListItemOld title="Title" />
            );
            const bodyText = queryByTestId(TEST_IDS.BODY_TEXT);
            expect(bodyText).not.toBeInTheDocument();
        });
    });

    describe('Image', () => {
        it('renders image', () => {
            const { getByTestId } = render(
                <ListItemOld
                    title="Title"
                    imageUrl="test"
                    imageAltText="test"
                />
            );
            expect(getByTestId(TEST_IDS.IMAGE)).toBeVisible();
        });

        it("doesn't render when image not provided", () => {
            const { queryByTestId } = render(<ListItemOld title="Title" />);
            const image = queryByTestId(TEST_IDS.IMAGE);
            expect(image).not.toBeInTheDocument();
        });
    });

    describe('Button', () => {
        it('renders button', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <ListItemOld
                    title="Title"
                    buttonText="Button"
                    buttonOnClick={() => {
                        return;
                    }}
                />
            );
            expect(getByTestId(TEST_IDS.BUTTON)).toBeInTheDocument();
            expect(getByText('Button')).toBeVisible();
        });

        it("doesn't render when button not provided", () => {
            const { queryByTestId } = renderWithTheme(
                <ListItemOld title="Title" />
            );
            const button = queryByTestId(TEST_IDS.BUTTON);
            expect(button).not.toBeInTheDocument();
        });

        it('calls button onClick when button clicked', () => {
            const onClick = jest.fn();
            const { getByText } = renderWithTheme(
                <ListItemOld
                    title="Title"
                    buttonText="Button"
                    buttonOnClick={onClick}
                />
            );
            const button = getByText('Button');
            fireEvent.click(button);
            expect(onClick).toHaveBeenCalled();
        });

        it('properly disables', () => {
            const onClick = jest.fn();
            const { getByText } = renderWithTheme(
                <ListItemOld
                    title="Title"
                    buttonText="Button"
                    buttonOnClick={onClick}
                    buttonDisabled={true}
                />
            );
            const button = getByText('Button');
            expect(button).toBeDisabled();
            fireEvent.click(button);
            expect(onClick).not.toHaveBeenCalled();
        });
    });
});
