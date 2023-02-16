import { Button, CenteredContainer, Switch } from '@/lib/shared/components/ui';
import { Meta, StoryFn } from '@storybook/react';
import { useContext, useState } from 'react';
import { Provider as AlertsProvider } from './Provider';
import { Context } from './Context';

const meta: Meta<typeof AlertsProvider> = {
    title: 'Alerts/AlertsProvider',
    component: AlertsProvider,
};

export default meta;

export const Default: StoryFn = () => {
    return (
        <AlertsProvider>
            <View />
        </AlertsProvider>
    );
};
const types = ['success', 'error', 'warning', 'info'] as const;
const View = () => {
    const [count, setCount] = useState(0);
    const [requireInteraction, setRequireInteration] = useState(false);
    const { createAlert } = useContext(Context);
    const index = count % types.length;
    const handleClick = () => {
        createAlert({
            type: types[index],
            title: new Date().getTime().toString(),
            message: `This is a ${types[index]} message`,
            requireInteraction,
        });
        setCount(count + 1);
    };
    return (
        <>
            <Button onClick={handleClick} style={{ marginRight: '16px' }}>
                Create
            </Button>
            <Switch
                displayText="Require interaction"
                checked={requireInteraction}
                onChange={() => setRequireInteration(!requireInteraction)}
            />
        </>
    );
};
