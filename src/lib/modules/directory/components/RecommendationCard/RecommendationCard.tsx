import {
    Avatar,
    AVATAR_SIZE,
    Button,
    Card,
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/lib/shared/components/ui';
import {
    VideoCameraFront,
    VideoCameraFrontOutlined,
} from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export function RecommendationCard() {
    return (
        <Card
            sx={{ bgcolor: 'white' }}
            headerSlot={
                <Stack spacing={4}>
                    <Avatar size={AVATAR_SIZE.XLARGE} />
                    <Stack spacing={0}>
                        <Paragraph
                            mb={0}
                            sx={{ fontSize: '22px', fontWeight: 'bold' }}
                        >
                            Denise Richards
                        </Paragraph>
                        <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                            Mental Health Coach
                        </Paragraph>
                    </Stack>
                    <Stack direction={'row'}>
                        <SessionTypeChip
                            label="Virtual"
                            size="small"
                            icon={<VideoCameraFrontOutlined />}
                            variant="outlined"
                            color="primary"
                        />
                    </Stack>
                </Stack>
            }
            preBodySlot={<hr />}
            postBodySlot={
                <Stack>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        <span style={{ fontWeight: 'bold' }}>
                            Specializes in:
                        </span>
                        <br />
                    </Paragraph>
                    <Link>Select Provider</Link>
                </Stack>
            }
            primaryButtonOnClick={console.log}
            fullWidthButton
            primaryButtonText={'View'}
        />
    );
}

const SessionTypeChip = styled(Chip)(({ theme }) => ({
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(2),
}));
