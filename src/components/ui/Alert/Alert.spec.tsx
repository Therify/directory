import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../fixtures/renderWithTheme';
import { Alert } from './index';

describe('Alert', () => {
    it('renders title text', () => {
        const { getByText } = renderWithTheme(<Alert title="Title" />);
        expect(getByText('Title')).toBeInTheDocument();
    });

    it('renders message text', () => {
        const { getByText } = renderWithTheme(
            <Alert title="Title" message="message" />
        );
        expect(getByText('message')).toBeInTheDocument();
    });

    it('renders icon', () => {
        const { getByTestId } = renderWithTheme(
            <Alert title="Title" icon={<p data-testid="test-icon">icon</p>} />
        );
        expect(getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should call onClose fn', () => {
        const onClose = jest.fn();
        const { getByLabelText } = renderWithTheme(
            <Alert title="Title" onClose={onClose} />
        );
        fireEvent.click(getByLabelText('Close'));
        expect(onClose).toHaveBeenCalled();
    });

    it('should render clickable actions', () => {
        const onClick = jest.fn();
        const { getByText } = renderWithTheme(
            <Alert
                title="Title"
                actions={[
                    {
                        displayText: 'Action 1',
                        onClick,
                    },
                ]}
            />
        );
        const action = getByText('Action 1');
        fireEvent.click(action);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
