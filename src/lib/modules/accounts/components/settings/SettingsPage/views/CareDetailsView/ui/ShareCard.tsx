import { Paragraph, Caption, Button } from '@/lib/shared/components/ui';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';

interface ShareCardProps {
    onCreateShareableLink: () => void;
}
export const ShareCard = ({ onCreateShareableLink }: ShareCardProps) => {
    return (
        <Paper sx={{ padding: 4 }}>
            <Container>
                <Box>
                    <Paragraph size="small" bold noMargin>
                        Share care with a dependent!
                    </Paragraph>
                    <Caption margin={0}>
                        You can share with 5 dependents.
                    </Caption>
                </Box>
                <Button
                    startIcon={<ContentCopyRounded />}
                    onClick={onCreateShareableLink}
                >
                    Create a shareable link
                </Button>
            </Container>
        </Paper>
    );
};

const Container = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > div': {
        marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        '& > div': {
            marginRight: theme.spacing(10),
            marginBottom: 0,
        },
    },
}));
