import { NavigationIcon, NAVIGATION_ICON } from '@/lib/sitemap';

import {
    HomeRounded,
    PsychologyOutlined,
    MapOutlined,
    CollectionsOutlined,
    QuestionAnswerOutlined,
    Notifications,
    AccountCircleOutlined,
    AccountCircleRounded,
    CreditCardOutlined,
    EmojiPeopleOutlined,
    DashboardRounded,
    PeopleOutlineRounded,
    MonetizationOnRounded,
    FavoriteBorderRounded,
    PersonSearchOutlined,
} from '@mui/icons-material';
import { TherifyIcon } from '../../Logo';

export const getNavigationIcon = (iconName?: NavigationIcon) => {
    switch (iconName) {
        case NAVIGATION_ICON.HOME:
            return HomeRounded;
        case NAVIGATION_ICON.THERAPY:
            return PsychologyOutlined;
        case NAVIGATION_ICON.JOURNEY:
            return MapOutlined;
        case NAVIGATION_ICON.LIBRARY:
            return CollectionsOutlined;
        case NAVIGATION_ICON.MESSAGING:
            return QuestionAnswerOutlined;
        case NAVIGATION_ICON.NOTIFICATION:
            return Notifications;
        case NAVIGATION_ICON.ACCOUNT:
            return AccountCircleOutlined;
        case NAVIGATION_ICON.BILLING:
            return CreditCardOutlined;
        case NAVIGATION_ICON.REFERRAL:
            return EmojiPeopleOutlined;
        case NAVIGATION_ICON.CLIENTS:
            return PeopleOutlineRounded;
        case NAVIGATION_ICON.DASHBOARD:
            return DashboardRounded;
        case NAVIGATION_ICON.PAYMENTS:
            return MonetizationOnRounded;
        case NAVIGATION_ICON.PROFILE_EDITOR:
            return AccountCircleRounded;
        case NAVIGATION_ICON.FAVORITES:
            return FavoriteBorderRounded;
        case NAVIGATION_ICON.DIRECTORY:
            return PersonSearchOutlined;
        case NAVIGATION_ICON.CHAT:
            return QuestionAnswerOutlined;
        case NAVIGATION_ICON.THERIFY_ICON:
            return TherifyLogoIcon;

        default:
            return null;
    }
};

const TherifyLogoIcon = () => <TherifyIcon style={{ width: '24px' }} />;
