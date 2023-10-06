import { Box } from '@mui/material';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { Button } from '../Button';

import { H1, Paragraph } from '../Typography/';
import { CelebrationContainer } from '../Containers';

export const TEST_IDS = {
    CONTAINER: 'container',
    CELEBRATION: 'celebration',
} as const;

interface BackgroundImage {
    backgroundImageUrl: string;
    withCelebrationStyling?: never;
}
interface CelebrationStyling {
    backgroundImageUrl?: never;
    withCelebrationStyling: true;
}

export interface JumbotronProps {
    headerText: string;
    subHeaderText?: string;
    backgroundProps: BackgroundImage | CelebrationStyling;
    callToAction?: {
        label: string;
        onClick?: () => void;
    };
    sx?: SxProps<Theme>;
}

export function Jumbotron({
    sx,
    headerText,
    subHeaderText,
    backgroundProps,
    callToAction,
}: JumbotronProps) {
    return (
        <Container
            data-testid={TEST_IDS.CONTAINER}
            backgroundImageUrl={backgroundProps.backgroundImageUrl}
            sx={sx}
        >
            {backgroundProps.withCelebrationStyling && (
                <CelebrationBackground data-testid={TEST_IDS.CELEBRATION} />
            )}
            <ContentContainer>
                <Header>{headerText}</Header>
                {subHeaderText && <SubHeader>{subHeaderText}</SubHeader>}
                {callToAction && (
                    <CallToActionButton
                        aria-label="button"
                        useCelebrationStyling={
                            backgroundProps.withCelebrationStyling
                        }
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
            background: 'transparent',
            border: `1px solid ${theme.palette.common.white}`,
            borderRadius: theme.shape.borderRadius,
            ':hover': {
                backgroundColor: theme.palette.common.white,
                color: theme.palette.common.black,
            },
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

const CelebrationBackground = styled(CelebrationContainer)(() => ({
    zIndex: 2,
    position: 'absolute',
    content: '""',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}));
