import { IconButton, Paragraph } from '@/lib/shared/components/ui';
import {
    PlayArrowRounded,
    PauseRounded,
    FullscreenRounded,
    FullscreenExitRounded,
} from '@mui/icons-material';
import { Box, styled, Slider } from '@mui/material';
import { VolumeControl } from './VolumeControl';

interface ControlsProps {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    isFullScreen: boolean;
    handleFullscreen: () => void;
    progressSeconds: number;
    setProgressSeconds: (progressSeconds: number) => void;
    durationSeconds: number;
    isMuted: boolean;
    toggleMute: () => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
    onSeekStart: () => void;
    onSeekEnd: () => void;
}

export const PlayerControls = ({
    isPlaying,
    setIsPlaying,
    isFullScreen,
    handleFullscreen,
    volume,
    progressSeconds,
    setProgressSeconds,
    durationSeconds,
    isMuted,
    toggleMute,
    onVolumeChange,
    onSeekStart,
    onSeekEnd,
}: ControlsProps) => {
    return (
        <Container className="player-controls">
            <ButtonsContainer>
                <Box
                    display="flex"
                    alignItems="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton
                        type="text"
                        color="info"
                        size="small"
                        onClick={() => setIsPlaying(!isPlaying)}
                        sx={{ color: 'white' }}
                    >
                        {isPlaying ? <PauseRounded /> : <PlayArrowRounded />}
                    </IconButton>
                    <Paragraph size="small" noMargin>
                        {formatMinutes(progressSeconds)}/
                        {formatMinutes(durationSeconds)}
                    </Paragraph>
                </Box>

                <Box
                    display="flex"
                    alignItems="flex-end"
                    onClick={(e) => e.stopPropagation()}
                >
                    <VolumeControl
                        isMuted={isMuted}
                        volume={volume}
                        toggleMute={toggleMute}
                        onVolumeChange={onVolumeChange}
                    />
                    <IconButton
                        type="text"
                        color="info"
                        size="small"
                        onClick={handleFullscreen}
                        sx={{ color: 'white' }}
                    >
                        {isFullScreen ? (
                            <FullscreenExitRounded />
                        ) : (
                            <FullscreenRounded />
                        )}
                    </IconButton>
                </Box>
            </ButtonsContainer>
            <ProgressContainer onClick={(e) => e.stopPropagation()}>
                <ProgressBar
                    isPlaying={isPlaying}
                    value={progressSeconds}
                    min={0}
                    max={durationSeconds}
                    step={1}
                    size="small"
                    aria-label="Player progress"
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatMinutes}
                    onChange={(_, value) =>
                        setProgressSeconds(
                            Array.isArray(value) ? value[0] : value
                        )
                    }
                    onMouseDown={onSeekStart}
                    onMouseUp={onSeekEnd}
                    color="secondary"
                />
            </ProgressContainer>
        </Container>
    );
};

const formatMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

const Container = styled(Box)(() => ({
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
    width: '100%',
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    color: theme.palette.common.white,
}));

const ProgressBar = styled(Slider, {
    shouldForwardProp: (prop) => prop !== 'isPlaying',
})<{ isPlaying: boolean }>(({ theme, isPlaying }) => ({
    color: theme.palette.common.white,
    '& .MuiSlider-thumb': {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        opacity: 0,
        transition: `${isPlaying ? 1 : 0}s all linear`,
    },
    '&:hover .MuiSlider-thumb': {
        opacity: 1,
    },
    '& .MuiSlider-track': {
        transition: `${isPlaying ? 1 : 0}s all linear`,
    },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 2.75),
    width: '100%',
}));
