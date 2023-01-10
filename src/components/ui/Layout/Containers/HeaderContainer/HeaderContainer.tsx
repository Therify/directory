import { Box, styled, SxProps, Theme } from '@mui/material';

import { colors } from '../../../../themes/therify-design-system';
import { AbstractShape2, AbstractShape3 } from '../../../Shapes';

interface HeaderContainerProps {
    type?: 'primary' | 'secondary';
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const HeaderContainer = ({
    type = 'primary',
    sx,
    children,
}: HeaderContainerProps) => {
    return (
        <Container type={type} sx={sx}>
            <Content>{children}</Content>
            {type === 'primary' ? <PrimaryShape /> : <SecondaryShape />}
        </Container>
    );
};

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'type',
})<{ type: HeaderContainerProps['type'] }>(({ theme, type }) => ({
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
    ...(type === 'primary'
        ? {
              background: theme.palette.background.default,
              padding: theme.spacing(31.5, 6.5, 8),
              marginBottom: theme.spacing(11.5),
              [theme.breakpoints.up('md')]: {
                  padding: theme.spacing(18, 20),
                  marginBottom: theme.spacing(14.5),
              },
          }
        : {
              color: colors.secondary.blue[500],
              background: theme.palette.secondary.light,
              padding: theme.spacing(5, 4),
              marginBottom: theme.spacing(20.5),
              [theme.breakpoints.up('md')]: {
                  marginBottom: theme.spacing(4),
                  padding: theme.spacing(8, 7),
              },
          }),
}));

const Content = styled(Box)(() => ({
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
}));
const PrimaryShape = styled(AbstractShape2)(({ theme }) => ({
    position: 'absolute',
    transform: 'rotate(-45deg)',
    height: '160%',
    top: '-90%',
    right: '-180px',
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
        height: '180%',
        top: '-90%',
        right: '-110px',
    },
    [theme.breakpoints.up('md')]: {
        top: '-50%',
        right: '-100px',
        transform: 'rotate(0deg)',
    },
}));

const SecondaryShape = styled(AbstractShape3)(({ theme }) => ({
    position: 'absolute',
    zIndex: 1,
    height: '300%',
    bottom: '-90%',
    right: '-120px',
    transform: 'rotate(-45deg)',
    [theme.breakpoints.up('md')]: {
        transform: 'rotate(0deg)',
        bottom: '-150%',
        right: '-40px',
    },
}));
