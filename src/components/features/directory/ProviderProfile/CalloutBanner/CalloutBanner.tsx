import { Paragraph } from '@/components/ui';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CalloutBannerProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}
export const CalloutBanner = ({
    title,
    description,
    icon,
}: CalloutBannerProps) => {
    return (
        <CalloutWrapper>
            <Box display="flex" flex={1} alignItems="center">
                <IconContainer>{icon}</IconContainer>
                <Box>
                    <Paragraph noMargin bold>
                        {title}
                    </Paragraph>
                    <Description>{description}</Description>
                </Box>
            </Box>
        </CalloutWrapper>
    );
};

const CalloutWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const Description = styled(Paragraph)(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.palette.info.main,
    marginBottom: 0,
}));

const IconContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(3.5),
    padding: theme.spacing(0, 2),
    '& svg': {
        fontSize: '2.125rem',
        color: theme.palette.primary.main,
    },
}));
