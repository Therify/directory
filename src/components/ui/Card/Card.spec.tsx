import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, TEST_IDS } from './Card';
describe('Card', () => {
    const user = userEvent.setup();
    it('renders title text', () => {
        const { getByText } = render(<Card title="Title" />);
        expect(getByText('Title')).toBeVisible();
    });

    describe('Body Text', () => {
        it('renders body text', () => {
            const { getByText, getByTestId } = render(
                <Card title="Title" bodyText="Body text" />
            );
            expect(getByTestId(TEST_IDS.BODY_TEXT)).toBeInTheDocument();
            expect(getByText('Body text')).toBeVisible();
        });
        it("doesn't render when body text not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const bodyText = queryByTestId(TEST_IDS.BODY_TEXT);
            expect(bodyText).not.toBeInTheDocument();
        });
    });

    describe('Header Slot', () => {
        it('renders header slot', () => {
            const { getByText, getByTestId } = render(
                <Card title="Title" headerSlot={<p>Hello World</p>} />
            );
            expect(getByTestId(TEST_IDS.HEADER_SLOT)).toBeInTheDocument();
            expect(getByText('Hello World')).toBeVisible();
        });
        it("doesn't render when header slot not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const slot = queryByTestId(TEST_IDS.HEADER_SLOT);
            expect(slot).not.toBeInTheDocument();
        });
    });

    describe('Pre Body Slot', () => {
        it('renders pre body slot', () => {
            const { getByText, getByTestId } = render(
                <Card title="Title" preBodySlot={<p>Hello World</p>} />
            );
            expect(getByTestId(TEST_IDS.PRE_BODY_SLOT)).toBeInTheDocument();
            expect(getByText('Hello World')).toBeVisible();
        });
        it("doesn't render when pre body slot not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const slot = queryByTestId(TEST_IDS.PRE_BODY_SLOT);
            expect(slot).not.toBeInTheDocument();
        });
    });

    describe('Post Body Slot', () => {
        it('renders post body slot', () => {
            const { getByText, getByTestId } = render(
                <Card title="Title" postBodySlot={<p>Hello World</p>} />
            );
            expect(getByTestId(TEST_IDS.POST_BODY_SLOT)).toBeInTheDocument();
            expect(getByText('Hello World')).toBeVisible();
        });
        it("doesn't render when pre body slot not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const slot = queryByTestId(TEST_IDS.POST_BODY_SLOT);
            expect(slot).not.toBeInTheDocument();
        });
    });

    describe('Image', () => {
        it('renders image', () => {
            const { getByTestId } = render(
                <Card title="Title" imageAltText="alt" imageUrl="test" />
            );
            const img = getByTestId(TEST_IDS.IMAGE);
            expect(img).toBeVisible();
            expect(img.firstChild).toHaveAttribute('src', 'test');
            expect(img.firstChild).toHaveAttribute('alt', 'alt');
        });
        it("doesn't render when image url not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const slot = queryByTestId(TEST_IDS.IMAGE);
            expect(slot).not.toBeInTheDocument();
        });

        it('renders background image when given backgroundImageCard flag', () => {
            const { getByTestId } = render(
                <Card
                    title="Title"
                    backgroundImageCard
                    imageAltText="alt"
                    imageUrl="test"
                />
            );
            const container = getByTestId(TEST_IDS.CONTAINER);
            expect(container).toHaveStyle("backgroundImage: 'url(test)'");
        });
    });

    describe('clickable card', () => {
        it('calls onClick when clicked', async () => {
            const onClick = jest.fn();
            const { getByTestId } = render(
                <Card title="Title" onClick={onClick} />
            );
            await user.click(getByTestId(TEST_IDS.CONTAINER));
            expect(onClick).toHaveBeenCalled();
        });
    });

    describe('Primary Button', () => {
        it('renders primary button text', () => {
            const { getByText, getByTestId } = render(
                <Card
                    title="Title"
                    primaryButtonText="Button"
                    primaryButtonOnClick={() => {
                        return;
                    }}
                />
            );
            expect(getByTestId(TEST_IDS.PRIMARY_BUTTON)).toBeInTheDocument();
            expect(getByText('Button')).toBeVisible();
        });
        it("doesn't render when button text not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const button = queryByTestId(TEST_IDS.PRIMARY_BUTTON);
            expect(button).not.toBeInTheDocument();
        });
        it('handles clicks on primary button', async () => {
            const onClick = jest.fn();
            const { getByText } = render(
                <Card
                    title="title"
                    primaryButtonText="Button"
                    primaryButtonOnClick={onClick}
                />
            );
            const button = getByText('Button');
            await user.click(button);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
        it('properly disables', async () => {
            const onClick = jest.fn();
            const { getByText } = render(
                <Card
                    title="title"
                    primaryButtonText="Button"
                    primaryButtonOnClick={onClick}
                    primaryButtonDisabled
                />
            );
            const button = getByText('Button');
            try {
                await user.click(button);
                expect(0).toBe(1);
            } catch (e) {
                expect(button).toHaveStyle('pointer-events: none');
                expect(onClick).not.toHaveBeenCalled();
            }
        });
    });

    describe('Secondary Button', () => {
        it('renders secondary button text', () => {
            const { getByText, getByTestId } = render(
                <Card
                    title="Title"
                    secondaryButtonText="Button"
                    secondaryButtonOnClick={() => {
                        return;
                    }}
                />
            );
            expect(getByTestId(TEST_IDS.SECONDARY_BUTTON)).toBeInTheDocument();
            expect(getByText('Button')).toBeVisible();
        });
        it("doesn't render when button text not provided", () => {
            const { queryByTestId } = render(<Card title="Title" />);
            const button = queryByTestId(TEST_IDS.SECONDARY_BUTTON);
            expect(button).not.toBeInTheDocument();
        });
        it('handles clicks on secondary button', async () => {
            const onClick = jest.fn();
            const { getByText } = render(
                <Card
                    title="title"
                    secondaryButtonText="Button"
                    secondaryButtonOnClick={onClick}
                />
            );
            const button = getByText('Button');
            await user.click(button);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
        it('properly disables', async () => {
            const onClick = jest.fn();
            const { getByText } = render(
                <Card
                    title="title"
                    secondaryButtonText="Button"
                    secondaryButtonOnClick={onClick}
                    secondaryButtonDisabled
                />
            );
            const button = getByText('Button');
            try {
                await user.click(button);
                expect(0).toBe(1);
            } catch (e) {
                expect(button).toHaveStyle('pointer-events: none');
                expect(onClick).not.toHaveBeenCalled();
            }
        });
    });
});
