import { Box } from '@mui/material';
import {
    styled,
    keyframes,
    useTheme,
    SxProps,
    Theme,
} from '@mui/material/styles';
import { colors } from '@/lib/shared/components/themes/therify-design-system';

const gradientColors = [
    colors.secondary.purple[200],
    colors.secondary.blue[200],
    colors.secondary.peach[300],
    colors.secondary.orange[300],
    colors.secondary.pink[300],
    colors.primary[400],
];

export const CelebrationContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'animate',
})<{ animate?: boolean }>(({ animate = true }) => ({
    backgroundSize: `${gradientColors.length * 100}% ${
        gradientColors.length * 100
    }% !important`,
    background: generateLinearGradient(gradientColors),
    ...(animate && { animation: `${move} 12s linear infinite` }),
}));

export const CelebrationBorderContainer = ({
    animate,
    backgroundColor,
    sx,
    children,
}: React.PropsWithChildren<{
    animate?: boolean;
    backgroundColor?: string;
    sx?: SxProps<Theme>;
}>) => {
    const theme = useTheme();
    return (
        <CelebrationContainer
            animate={animate}
            padding="2px"
            style={{ borderRadius: theme.shape.borderRadius }}
        >
            <InnerContainer {...{ sx, backgroundColor }}>
                {children}
            </InnerContainer>
        </CelebrationContainer>
    );
};

const InnerContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{ backgroundColor?: string }>(({ theme, backgroundColor }) => ({
    backgroundColor: backgroundColor ?? theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
}));

const generateLinearGradient = (colors: string[]) => {
    return `linear-gradient(-45deg, ${[...colors].join(',')})`;
};

const move = keyframes`
   0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;
