import { Box } from "@mui/material";
import { SxProps, Theme } from '@mui/material/styles';
import { Button, Paragraph } from '@/lib/shared/components/ui';

import { styled } from '@mui/material/styles';
import { H1 } from '@/lib/shared/components/ui';

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
    }
    sx?: SxProps<Theme>
}

export function Jumbotron({ sx, headerText, subHeaderText, backgroundImageUrl, callToAction }: JumbotronProps) {
    return (
        <Container data-testid={TEST_IDS.CONTAINER} backgroundImageUrl={backgroundImageUrl} sx={sx}>
            <ContentContainer>
                <Header>{headerText}</Header>
                {subHeaderText ?? <SubHeader>{subHeaderText}</SubHeader>}
                {callToAction && <Button aria-label="button" onClick={callToAction.onClick}>{callToAction.label}</Button>}
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

const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(5),
    position: 'relative',
    zIndex: 2,
}));

const Container = styled(Box, {
    shouldForwardProp: (prop) =>
        !['backgroundImageUrl'].includes(prop.toString()),
})<{ backgroundImageUrl: string | undefined }>(({ theme, backgroundImageUrl }) => ({
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
        backgroundImage: `url(${backgroundImageUrl})`
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
}));
