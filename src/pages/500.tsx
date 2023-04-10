import {
    CenteredContainer,
    H1,
    Paragraph,
    Button,
    TherifyIcon,
    AbstractShape1,
} from '@/lib/shared/components/ui';
import { URL_PATHS } from '@/lib/sitemap';
import { Box, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
    const router = useRouter();
    const theme = useTheme();
    const emailSubject = `Therify Server-side Issue: ${
        typeof window !== 'undefined' ? window?.location.href : ''
    }`;

    const emailBody = `
        Hi Therify Team,
        I'm experiencing a server side issue while trying to access this page:
        ${typeof window !== 'undefined' ? window?.location.href : ''}
    
        What I was trying to do:
        Please describe what you were trying to do when you encountered this issue. Include as much detail as possible.
    `;
    return (
        <CenteredContainer
            fillSpace
            style={{ background: theme.palette.background.default }}
        >
            <Container>
                <CenteredContainer zIndex={2}>
                    <TherifyIcon />
                    <H1 marginTop={4}>We&apos;ve encountered an issue</H1>
                    <Paragraph>
                        It&apos;s not you, it&apos;s us. There was an error
                        preparing the page. If this continues, please{' '}
                        <Link
                            target="_blank"
                            href={`mailto:help@therify.co?subject=${encodeURIComponent(
                                emailSubject
                            )}&body=${encodeURIComponent(emailBody)}`}
                        >
                            contact us
                        </Link>
                        .
                    </Paragraph>
                    <ButtonContainer>
                        <Button
                            type="outlined"
                            color="info"
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    window.location.reload();
                                }
                            }}
                        >
                            Refresh
                        </Button>
                        <Button onClick={() => router.push(URL_PATHS.ROOT)}>
                            Go Home
                        </Button>
                    </ButtonContainer>
                </CenteredContainer>
                <Shape />
            </Container>
        </CenteredContainer>
    );
}
const Shape = styled(AbstractShape1)(() => ({
    position: 'absolute',
    width: '250px',
    top: -100,
    right: -100,
    transform: 'rotate(-90deg)',
    zIndex: 1,
}));
const Container = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(10),
    maxWidth: '800px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));
const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& > button': {
        flex: 1,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            '&:first-of-type': {
                marginRight: theme.spacing(2),
            },
        },
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));
