import { Caption, Paragraph } from '@/lib/shared/components/ui';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    isToday,
    isThisMinute,
    isYesterday,
    isThisYear,
    format,
} from 'date-fns';

interface MessageNameProps {
    name: string;
    timestamp?: number;
    isMine?: boolean;
}

export const MessageName = ({ name, timestamp, isMine }: MessageNameProps) => {
    const theme = useTheme();
    return (
        <Box
            display="flex"
            justifyContent={isMine ? 'flex-end' : 'space-between'}
            alignItems="center"
            marginBottom={theme.spacing(2)}
        >
            {!isMine && (
                <Paragraph
                    size="small"
                    bold
                    noMargin
                    style={{
                        marginRight: isMine ? '0px' : theme.spacing(4),
                        marginLeft: isMine ? theme.spacing(4) : '0px',
                    }}
                >
                    {name}
                </Paragraph>
            )}
            {timestamp && (
                <Caption secondary size="small" style={{ margin: 0 }}>
                    {formatTimestamp(new Date(timestamp))}
                </Caption>
            )}
        </Box>
    );
};

const formatTimestamp = (timestamp: Date) => {
    if (isThisMinute(timestamp)) return 'Now';
    const time = format(timestamp, 'h:mm a');
    if (isToday(timestamp)) return `Today ${time}`;
    if (isYesterday(timestamp)) return `Yesterday ${time}`;
    if (isThisYear(timestamp)) return format(timestamp, 'MMM do h:mm a');
    return format(timestamp, 'MMM do, yyyy h:mm a');
};
