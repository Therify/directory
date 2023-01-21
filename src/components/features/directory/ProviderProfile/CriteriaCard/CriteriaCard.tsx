import {
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/components/ui/Typography/Paragraph';
import {
    AutoFixHighOutlined,
    HealthAndSafetyOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Stack } from '@mui/material';
import { StackProps } from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';

export const CRITERIA_CARD_TYPES = {
    INSURANCE: 'insurance',
    SPECIALTIES: 'specialties',
} as const;

export type CriteriaCardType =
    typeof CRITERIA_CARD_TYPES[keyof typeof CRITERIA_CARD_TYPES];

const CRITERIA_CARD_BG_COLORS: Record<CriteriaCardType, string> = {
    [CRITERIA_CARD_TYPES.INSURANCE]: '#EEEDF9',
    [CRITERIA_CARD_TYPES.SPECIALTIES]: '#E3EBED',
};
const CRITERIA_CARD_AVATAR_COLORS: Record<CriteriaCardType, string> = {
    [CRITERIA_CARD_TYPES.INSURANCE]: '#565371',
    [CRITERIA_CARD_TYPES.SPECIALTIES]: '#3B4D54',
};

const getBackgroundColor = (type: CriteriaCardType) =>
    CRITERIA_CARD_BG_COLORS[type];
const getAvatarColor = (type: CriteriaCardType) =>
    CRITERIA_CARD_AVATAR_COLORS[type];

type CriteriaCardProps = {
    type: CriteriaCardType;
    items?: string[];
} & StackProps;

export function CriteriaCard({ type, items, ...props }: CriteriaCardProps) {
    const { sx, ...rest } = props;
    const theme = useTheme();
    const Icon =
        type === CRITERIA_CARD_TYPES.INSURANCE
            ? HealthAndSafetyOutlined
            : AutoFixHighOutlined;
    return (
        <CriteriaCardContainer
            spacing={2}
            sx={{
                ...sx,
                py: 4,
                px: 6,
                backgroundColor: getBackgroundColor(type),
                [theme.breakpoints.up('md')]: {
                    borderRaidus: 8,
                },
            }}
            {...rest}
        >
            <CriteriaCardHeader spacing={4}>
                <Avatar
                    sx={{
                        backgroundColor: getAvatarColor(type),
                    }}
                >
                    <Icon />
                </Avatar>
                <Paragraph size={PARAGRAPH_SIZE.LARGE}>
                    {type === CRITERIA_CARD_TYPES.INSURANCE
                        ? 'In-network with'
                        : 'Specializes in'}
                </Paragraph>
            </CriteriaCardHeader>
            <CriteriaCardContent>
                <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                    {items?.join(', ')}
                </Paragraph>
            </CriteriaCardContent>
        </CriteriaCardContainer>
    );
}

export const CriteriaCardContainer = styled(Stack)(({ theme }) => ({
    maxWidth: 338,
    [theme.breakpoints.up('md')]: {
        borderRaidus: 8,
    },
}));

const CriteriaCardHeader = styled(Stack)(({ theme }) => ({}));

const CriteriaCardContent = styled(Box)(({ theme }) => ({}));
