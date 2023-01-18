import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';
import { ElementType } from 'react';
import { BoxProps } from '@mui/system';
import Stack from '@mui/material/Stack';
import { AbstractShape1, AbstractShape2 } from '../Shapes';

export type PageHeaderProps = {
    /**
     * The type to use.
     */
    type?: 'primary' | 'secondary' | 'info' | 'abstract1' | 'abstract2';
    /**
     * The title to display.
     */
    title: string;
    /**
     * The subtitle to display under the title.
     * @default undefined
     */
    subtitle?: string;
    /**
     * The element type to use for the title.
     * @default 'h1'
     */
    titleElement?: ElementType;
    /**
     * The element type to use for the subtitle.
     * @default 'h2'
     */
    subtitleElement?: ElementType;
    actionSlot?: React.ReactNode;
} & Omit<TypographyProps, 'variant'>;

export function PageHeader({
    title,
    subtitle,
    titleElement = 'h1',
    subtitleElement = 'h2',
    type = 'primary',
    actionSlot,
}: PageHeaderProps) {
    return (
        <StyledHeader as={'header'} type={type}>
            {type === 'abstract1' && <PrimaryAbstractImage />}
            {type === 'abstract2' && <SecondaryAbstractImage />}
            <Stack spacing={4}>
                <Box zIndex={2}>
                    <StyledTitle as={titleElement}>{title}</StyledTitle>
                    {subtitle && (
                        <StyledSubtitle as={subtitleElement}>
                            {subtitle}
                        </StyledSubtitle>
                    )}
                </Box>
                {actionSlot && <Box>{actionSlot}</Box>}
            </Stack>
        </StyledHeader>
    );
}

const TYPE_TO_COLOR_MAP: Record<
    'primary' | 'secondary' | 'info' | 'abstract1' | 'abstract2',
    keyof Theme['palette']
> = {
    primary: 'primary',
    secondary: 'secondary',
    info: 'info',
    abstract1: 'primary',
    abstract2: 'secondary',
};

const mapTypeToPalette = (theme: Theme, type: PageHeaderProps['type']) => {
    switch (type) {
        case 'abstract1':
        case 'primary':
            return {
                backgroundColor: '#FFFAF5',
                color: '#231B14',
            };
        case 'abstract2':
        case 'secondary':
            return {
                backgroundColor: '#3B4D54',
                color: theme.palette.secondary.contrastText,
            };
        case 'info':
            return {
                backgroundColor: '#565371',
                color: theme.palette.info.contrastText,
            };
    }
};

const PrimaryAbstractImage = styled(AbstractShape1)(({ theme }) => ({
    transition: theme.transitions.create('all'),
    position: 'absolute',
    zIndex: 0,
    transform: 'rotate(320deg)',
    width: '70%',
    right: '-25%',
    top: '-25%',
    [theme.breakpoints.up('sm')]: {
        transform: 'rotate(25deg)',
        width: '30%',
        top: '0',
        right: '0',
    },
}));

const SecondaryAbstractImage = styled(AbstractShape2)(({ theme }) => ({
    transition: theme.transitions.create('all'),
    position: 'absolute',
    zIndex: 0,
    transform: 'rotate(320deg)',
    width: '50%',
    right: '-25%',
    top: '-25%',
    [theme.breakpoints.up('sm')]: {
        transform: 'rotate(90deg)',
        width: '30%',
        top: '0',
        right: '0',
    },
}));

const StyledHeader = styled(Box)<
    BoxProps & {
        type: PageHeaderProps['type'];
    }
>(({ theme, type }) => ({
    ...mapTypeToPalette(theme, type),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(9),
    },
}));

const StyledTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    ...theme.typography.h3,
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
}));
