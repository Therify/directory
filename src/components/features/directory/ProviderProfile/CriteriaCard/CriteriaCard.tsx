import {
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/components/ui/Typography/Paragraph';
import { HealthAndSafetyOutlined } from '@mui/icons-material';
import { Avatar, Box, Stack } from '@mui/material';
import { StackProps } from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';

const CRITERIA_CARD_TYPES = {
    SECONDARY: 'secondary',
    INFO: 'info',
} as const;

export type CriteriaCardType =
    typeof CRITERIA_CARD_TYPES[keyof typeof CRITERIA_CARD_TYPES];

const CRITERIA_CARD_BG_COLORS: Record<CriteriaCardType, string> = {
    [CRITERIA_CARD_TYPES.SECONDARY]: '#E3EBED',
    [CRITERIA_CARD_TYPES.INFO]: '#EEEDF9',
};
const CRITERIA_CARD_AVATAR_COLORS: Record<CriteriaCardType, string> = {
    [CRITERIA_CARD_TYPES.SECONDARY]: '#3B4D54',
    [CRITERIA_CARD_TYPES.INFO]: '#565371',
};

const getBackgroundColor = (type: CriteriaCardType) =>
    CRITERIA_CARD_BG_COLORS[type];
const getAvatarColor = (type: CriteriaCardType) =>
    CRITERIA_CARD_AVATAR_COLORS[type];

type CriteriaCardProps = {
    type: CriteriaCardType;
} & StackProps;

export function CriteriaCard({ type = 'info', ...props }: CriteriaCardProps) {
    const { sx, ...rest } = props;
    const theme = useTheme();
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
                    <HealthAndSafetyOutlined />
                </Avatar>
                <Paragraph size={PARAGRAPH_SIZE.LARGE}>Criteria Card</Paragraph>
            </CriteriaCardHeader>
            <CriteriaCardContent>
                <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                    Aetna, Blue Cross Blue Shield of Michigan, Cigna, Oscar
                    Health, Oxford, and United Healthcare
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
