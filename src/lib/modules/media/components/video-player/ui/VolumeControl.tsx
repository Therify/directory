import { IconButton } from '@/lib/shared/components/ui';
import { Box, Slider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { VolumeUpRounded, VolumeOffRounded } from '@mui/icons-material';

interface VolumeControlProps {
    isMuted: boolean;
    toggleMute: () => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
}
const VOLUME_SLIDER_CLASS_NAME = 'volume-slider' as const;

export const VolumeControl = ({
    isMuted,
    volume,
    toggleMute,
    onVolumeChange,
}: VolumeControlProps) => {
    return (
        <VolumeContainer>
            <TrackContainer className={VOLUME_SLIDER_CLASS_NAME}>
                <VerticalAccessibleSlider
                    value={isMuted ? 0 : volume}
                    onChange={onVolumeChange}
                />
            </TrackContainer>
            <IconButton
                type="text"
                color="info"
                size="small"
                onClick={() => toggleMute()}
                sx={{ color: 'white' }}
            >
                {isMuted || volume === 0 ? (
                    <VolumeOffRounded />
                ) : (
                    <VolumeUpRounded />
                )}
            </IconButton>
        </VolumeContainer>
    );
};

const VolumeContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    [`& .${VOLUME_SLIDER_CLASS_NAME}`]: {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
    },
    [`&:hover .${VOLUME_SLIDER_CLASS_NAME}`]: {
        opacity: 1,
    },
}));

const TrackContainer = styled(Box)(({ theme }) => ({
    height: '100px',
    maxHeight: '65%',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    '& svg': {
        fontSize: theme.spacing(3.5),
        ':first-of-type': {
            marginBottom: theme.spacing(4),
        },
        ':last-of-type': {
            marginTop: theme.spacing(4),
        },
    },
    [theme.breakpoints.up('md')]: {
        height: '140px',
    },
}));

const VerticalAccessibleSlider = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    const theme = useTheme();
    function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }

    return (
        <Slider
            sx={{
                color: theme.palette.common.white,
                '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                },
            }}
            orientation="vertical"
            value={value}
            onChange={(_, value) => {
                if (Array.isArray(value)) return onChange(value[0]);
                return onChange(value);
            }}
            aria-label="Volume"
            valueLabelDisplay="off"
            min={0}
            max={1}
            step={0.05}
            size="small"
            color="secondary"
            onKeyDown={preventHorizontalKeyboardNavigation}
        />
    );
};
