import {
    Paragraph,
    Caption,
    Button,
    IconButton,
    Divider,
} from '@/lib/shared/components/ui';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Link from 'next/link';

interface ShareCardProps {
    onCreateShareableLink: () => void;
    dependentInvitationLink?: string;
}
export const ShareCard = ({
    onCreateShareableLink,
    dependentInvitationLink,
}: ShareCardProps) => {
    return (
        <Paper sx={{ padding: 4, width: '100%' }}>
            <Container>
                <Box flex={1}>
                    <Paragraph size="small" bold noMargin>
                        Share care with a dependent!
                    </Paragraph>
                    <Caption margin={0}>
                        You can share with 5 dependents.
                    </Caption>
                    {dependentInvitationLink && (
                        <>
                            <Divider />
                            <SharableLink link={dependentInvitationLink} />
                        </>
                    )}
                </Box>
                {!dependentInvitationLink && (
                    <Button
                        startIcon={<ContentCopyRounded />}
                        onClick={onCreateShareableLink}
                    >
                        Create a shareable link
                    </Button>
                )}
            </Container>
        </Paper>
    );
};

const SharableLink = ({ link }: { link: string }) => {
    const theme = useTheme();
    const handleCopy = () => {
        if (typeof window === 'undefined') return;
        window.navigator.clipboard
            .writeText(link)
            .then(() => {
                console.log('copied');
            })
            .catch((err) => {});
    };
    return (
        <Box marginTop={4} width="100%">
            <Caption secondary margin={0}>
                Your link:
            </Caption>
            <Stack
                maxWidth="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-betwen"
            >
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: theme.palette.text.primary,
                    }}
                >
                    {link}
                </Link>
                <IconButton
                    type="text"
                    size="small"
                    onClick={handleCopy}
                    sx={{ marginLeft: 2 }}
                >
                    <ContentCopy />
                </IconButton>
            </Stack>
        </Box>
    );
};

const Container = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
