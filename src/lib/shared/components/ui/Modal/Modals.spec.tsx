import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { Modal, TEST_IDS } from './Modal';

describe('Modal', () => {
    it('renders when open', () => {
        const { getByTestId } = renderWithTheme(
            <Modal
                isOpen
                onClose={() => {
                    return;
                }}
            />
        );
        expect(getByTestId(TEST_IDS.MODAL)).toBeVisible();
    });

    it('does not render when closed', () => {
        const { queryByTestId } = renderWithTheme(
            <Modal
                isOpen={false}
                onClose={() => {
                    return;
                }}
            />
        );
        expect(queryByTestId(TEST_IDS.MODAL)).not.toBeInTheDocument();
    });

    describe('Backdrop', () => {
        it('calls onClose when backdrop clicked', async () => {
            const onClose = jest.fn();
            const { getByTestId } = renderWithTheme(
                <Modal isOpen onClose={onClose} />
            );
            const backdrop = getByTestId(TEST_IDS.MODAL).firstChild;
            if (backdrop) fireEvent.click(backdrop);
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it('does not call onClose when backdrop click disabled', async () => {
            const onClose = jest.fn();
            const { getByTestId } = renderWithTheme(
                <Modal isOpen onClose={onClose} allowBackdropClose={false} />
            );
            const backdrop = getByTestId(TEST_IDS.MODAL).firstChild;
            if (backdrop) fireEvent.click(backdrop);
            expect(onClose).toHaveBeenCalledTimes(0);
        });

        it('hides backdrop', async () => {
            const { getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    hideBackdrop={true}
                />
            );
            const backdrop = getByTestId(TEST_IDS.MODAL).firstChild;
            expect(backdrop).not.toHaveClass('MuiBackdrop-root');
        });
    });

    describe('Body Text', () => {
        it('renders title', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    title="Title"
                />
            );
            expect(getByTestId(TEST_IDS.TITLE)).toBeInTheDocument();
            expect(getByText('Title')).toBeVisible();
        });

        it('does not render title when no title present', () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            expect(queryByTestId(TEST_IDS.TITLE)).not.toBeInTheDocument();
        });

        it('renders message body', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    message="Message"
                />
            );
            expect(getByTestId(TEST_IDS.MESSAGE)).toBeInTheDocument();
            expect(getByText('Message')).toBeVisible();
        });

        it('does not render message when no title present', () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            expect(queryByTestId(TEST_IDS.MESSAGE)).not.toBeInTheDocument();
        });
    });

    describe('Header Slot', () => {
        const HeaderSlot = <p>Hello World</p>;
        it('renders header slot', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    headerSlot={HeaderSlot}
                />
            );
            expect(getByText('Hello World')).toBeVisible();
            expect(getByTestId(TEST_IDS.HEADER_SLOT)).toBeInTheDocument();
        });
        it("doesn't render when header slot not provided", () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            const slot = queryByTestId(TEST_IDS.HEADER_SLOT);
            expect(slot).not.toBeInTheDocument();
        });

        it('applies margin when body text present', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    title="Title"
                    headerSlot={HeaderSlot}
                />
            );
            const slot = getByTestId(TEST_IDS.HEADER_SLOT);
            expect(slot).toHaveStyle(`margin-bottom: ${theme.spacing(4)}`);
        });

        it('does not apply margin when body text not present', () => {
            const { getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    headerSlot={HeaderSlot}
                />
            );
            const slot = getByTestId(TEST_IDS.HEADER_SLOT);
            expect(slot).toHaveStyle('margin-bottom: 0');
        });
    });

    describe('Post Body Slot', () => {
        const PostBodySlot = <p>Hello World</p>;
        it('renders post body slot', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    postBodySlot={PostBodySlot}
                />
            );
            expect(getByText('Hello World')).toBeVisible();
            expect(getByTestId(TEST_IDS.POST_BODY_SLOT)).toBeInTheDocument();
        });

        it("doesn't render when post body slot not provided", () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            const slot = queryByTestId(TEST_IDS.POST_BODY_SLOT);
            expect(slot).not.toBeInTheDocument();
        });

        it('applies margin when body text present', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    title="Title"
                    postBodySlot={PostBodySlot}
                />
            );
            const slot = getByTestId(TEST_IDS.POST_BODY_SLOT);
            expect(slot).toHaveStyle(`margin-top: ${theme.spacing(4)}`);
        });

        it('applies margin when header slot present', () => {
            const { getByTestId, theme } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    title="Title"
                    headerSlot={<p />}
                    postBodySlot={PostBodySlot}
                />
            );
            const slot = getByTestId(TEST_IDS.POST_BODY_SLOT);
            expect(slot).toHaveStyle(`margin-top: ${theme.spacing(4)}`);
        });

        it('does not apply margin when no body text or header slot present', () => {
            const { getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    postBodySlot={PostBodySlot}
                />
            );
            const slot = getByTestId('modal-post-body-slot');
            expect(slot).toHaveStyle('margin-top: 0');
        });
    });

    describe('Primary Button', () => {
        it('renders primary button text', () => {
            const { getByText, getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    primaryButtonText="Button"
                    primaryButtonOnClick={() => {
                        return;
                    }}
                />
            );
            expect(getByText('Button')).toBeVisible();
            expect(getByTestId(TEST_IDS.PRIMARY_BUTTON)).toBeInTheDocument();
        });
        it("doesn't render when button text not provided", () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            const button = queryByTestId('modal-primary-button');
            expect(button).not.toBeInTheDocument();
        });
        it('handles clicks on primary button', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            const { getByText } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
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
            const user = userEvent.setup();
            const { getByText } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
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
            const { getByText, getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    secondaryButtonText="Button"
                    secondaryButtonOnClick={() => {
                        return;
                    }}
                />
            );
            expect(getByText('Button')).toBeVisible();
            expect(getByTestId(TEST_IDS.SECONDARY_BUTTON)).toBeInTheDocument();
        });
        it("doesn't render when button text not provided", () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            const button = queryByTestId(TEST_IDS.SECONDARY_BUTTON);
            expect(button).not.toBeInTheDocument();
        });
        it('handles clicks on secondary button', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            const { getByText } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
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
            const user = userEvent.setup();
            const { getByText } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
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
    describe('Close Button', () => {
        it('renders close button', () => {
            const { getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    showCloseButton
                />
            );
            expect(getByTestId(TEST_IDS.CLOSE_BUTTON)).toBeVisible();
        });
        it('renders close button by default', () => {
            const { getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                />
            );
            expect(getByTestId(TEST_IDS.CLOSE_BUTTON)).toBeVisible();
        });
        it("doesn't render close button when hidden", () => {
            const { queryByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    showCloseButton={false}
                />
            );
            const button = queryByTestId(TEST_IDS.CLOSE_BUTTON);
            expect(button).not.toBeInTheDocument();
        });
        it('handles clicks on close button', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            const { getByTestId } = renderWithTheme(
                <Modal isOpen onClose={onClick} showCloseButton />
            );
            const button = getByTestId(TEST_IDS.CLOSE_BUTTON);
            await user.click(button);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
        it('properly disables', async () => {
            const onClick = jest.fn();
            const user = userEvent.setup();
            const { getByTestId } = renderWithTheme(
                <Modal
                    isOpen
                    onClose={() => {
                        return;
                    }}
                    showCloseButton
                    closeButtonDisabled
                />
            );
            const button = getByTestId(TEST_IDS.CLOSE_BUTTON);
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
