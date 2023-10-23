import {
    FormConfig,
    FormSection,
} from '@/lib/shared/components/ui/FormElements/FormRenderer/types';
import { Type as NotificationsForm } from './schema';

const turnAllOnOffSwitch: FormSection<NotificationsForm> = {
    fields: [
        {
            id: 'turnEmailOnOff',
            type: 'toggle',
            toggleType: 'switch',
            label: 'Turn on/off email notifications',
            statePath: 'isEmailNotificationsOn',
            fullWidth: true,
        },
    ],
};
const emailNotifications: FormSection<NotificationsForm> = {
    fields: [
        {
            id: 'newMessages',
            type: 'toggle',
            toggleType: 'checkbox',
            label: 'New Messages',
            statePath: 'email.newMessages',
            fullWidth: true,
        },
        {
            id: 'matchProgress',
            type: 'toggle',
            toggleType: 'checkbox',
            label: 'Match Progress',
            statePath: 'email.matchProgress',
            fullWidth: true,
        },
    ],
};

export const config: FormConfig<NotificationsForm> = {
    sections: [turnAllOnOffSwitch, emailNotifications],
};
