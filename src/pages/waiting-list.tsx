import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import {
    Paragraph,
    H1,
    Caption,
    CenteredContainer,
    AbstractShape1,
    Button,
} from '@/lib/shared/components/ui';
import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '@/lib/modules/accounts/service';
import { URL_PATHS } from '@/lib/sitemap';

export default function WaitingListPage() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <CenteredContainer
            fillSpace
            style={{ background: theme.palette.background.default }}
        >
            <Container>
                <CenteredContainer zIndex={2}>
                    <Title>Join our Waiting List</Title>
                    <Caption secondary>
                        The account you&apos;ve attemped to join is currently
                        full at this time. You can join our waiting by clicking
                        the button below.
                    </Caption>
                    <Button
                        onClick={() =>
                            router.push(URL_PATHS.EXTERNAL.JOTFORM.WAITING_LIST)
                        }
                    >
                        Follow this link to join our waiting list.
                    </Button>
                </CenteredContainer>
                <Shape />
            </Container>
        </CenteredContainer>
    );
}
const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h2,
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

const Shape = styled(AbstractShape1)(({ theme }) => ({
    position: 'absolute',
    width: '250px',
    top: -100,
    right: -100,
    transform: 'rotate(-90deg)',
    zIndex: 0,
}));

const CountDown = styled(Paragraph)(({ theme }) => ({
    fontSize: theme.typography.h1.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(6, 0),
}));

const withLeadingZero = (num?: number) => {
    if (num === undefined || num < 0) return '00';
    return num.toString().padStart(2, '0');
};
