import { Box } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { TherifyLogo } from '../../../Logo';
import { Stepper } from '../../../Stepper';

interface StepperContainerProps {
    currentStepIndex: number;
    steps: string[];
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const StepperContainer = ({
    currentStepIndex,
    steps,
    children,
    sx,
}: StepperContainerProps) => {
    return (
        <Box height="100%" width="100%" sx={sx}>
            <HeaderContainer>
                <Logo />
                <StepperWrapper>
                    <Stepper activeStepIndex={currentStepIndex} steps={steps} />
                </StepperWrapper>
            </HeaderContainer>
            {children}
        </Box>
    );
};

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
}));

const StepperWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

const Logo = styled(TherifyLogo)(({ theme }) => ({
    height: '52px',
    marginBottom: theme.spacing(4),
    alignSelf: 'center',
}));
