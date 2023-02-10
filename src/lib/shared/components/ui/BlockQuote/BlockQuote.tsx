import { Paragraph } from '../Typography';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface BlockQuoteProps {
    bold?: boolean;
    italic?: boolean;
    size?: BlockQuoteSize;
}

export const BLOCK_QUOTE_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type BlockQuoteSize =
    typeof BLOCK_QUOTE_SIZE[keyof typeof BLOCK_QUOTE_SIZE];

export const TEST_IDS = {
    QUOTE: 'block-quote',
} as const;

export const BlockQuote = ({
    bold,
    italic,
    size = BLOCK_QUOTE_SIZE.LARGE,
    children,
    ...props
}: BlockQuoteProps & BoxProps) => (
    <Block {...props}>
        <Paragraph
            data-testid={TEST_IDS.QUOTE}
            noMargin
            bold={bold}
            italic={italic}
            size={size}
        >
            {children}
        </Paragraph>
    </Block>
);

const Block = styled(Box)(({ theme }) => ({
    position: 'relative',
    background: theme.palette.grey[50],
    padding: theme.spacing(6, 9.5),
    borderRadius: theme.shape.borderRadius,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        background: theme.palette.primary.main,
        borderRadius: '2px',
    },
}));
