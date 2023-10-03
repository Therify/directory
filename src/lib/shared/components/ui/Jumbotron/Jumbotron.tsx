import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Button } from '../Button';

import { styled } from '@mui/material/styles';
import { H1, Paragraph } from '../Typography/';
import { CelebrationContainer } from '../Containers';

export const TEST_IDS = {
    CONTAINER: 'container',
} as const;

export interface JumbotronProps {
    headerText: string;
    subHeaderText?: string;
    backgroundImageUrl?: string;
    callToAction?: {
        label: string;
        onClick?: () => void;
    };
    useCelebrationStyling?: boolean;
    sx?: SxProps<Theme>;
}

export function Jumbotron({
    sx,
    headerText,
    subHeaderText,
    backgroundImageUrl,
    callToAction,
    useCelebrationStyling,
}: JumbotronProps) {
    return (
        <Container
            data-testid={TEST_IDS.CONTAINER}
            backgroundImageUrl={backgroundImageUrl}
            sx={sx}
        >
            {useCelebrationStyling && <CelebrationBackground />}
            <ContentContainer>
                <Header>{headerText}</Header>
                {subHeaderText && <SubHeader>{subHeaderText}</SubHeader>}
                {callToAction && (
                    <CallToActionButton
                        aria-label="button"
                        useCelebrationStyling={useCelebrationStyling}
                        onClick={callToAction.onClick}
                    >
                        {callToAction.label}
                    </CallToActionButton>
                )}
            </ContentContainer>
        </Container>
    );
}

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h4,
}));

const SubHeader = styled(Paragraph)(({ theme }) => ({
    ...theme.typography.body1,
}));

const CallToActionButton = styled(Button, {
    shouldForwardProp: (prop) =>
        !['useCelebrationStyling'].includes(prop.toString()),
})<{ useCelebrationStyling: boolean | undefined }>(
    ({ theme, useCelebrationStyling }) => ({
        ...(useCelebrationStyling && {
            background: 'rgba(204, 204, 204, 0.0)',
            border: `1px solid ${theme.palette.common.white}`,
            borderRadius: theme.shape.borderRadius,
        }),
    })
);

const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
    position: 'relative',
    zIndex: 3,
}));

const Container = styled(Box, {
    shouldForwardProp: (prop) =>
        !['backgroundImageUrl'].includes(prop.toString()),
})<{ backgroundImageUrl: string | undefined }>(
    ({ theme, backgroundImageUrl }) => ({
        height: 258,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: theme.palette.common.white,
        padding: theme.spacing(7.5, 5),
        position: 'relative',
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        ...(backgroundImageUrl && {
            backgroundImage: `url(${backgroundImageUrl})`,
        }),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '::after': {
            opacity: 0.6,
            zIndex: 1,
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: theme.palette.common.black,
        },
        [theme.breakpoints.up('md')]: {
            height: 326,
        },
    })
);

const CelebrationBackground = styled(CelebrationContainer)(({ theme }) => ({
    zIndex: 2,
    position: 'absolute',
    content: '""',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}));
