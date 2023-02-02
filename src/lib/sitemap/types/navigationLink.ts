import { NavigationIcon } from './navigationIcon';

export interface NavigationLink {
    path: string;
    displayName: string;
    icon?: NavigationIcon;
    disabled?: boolean;
}
