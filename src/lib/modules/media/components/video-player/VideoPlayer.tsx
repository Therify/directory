import { OnProgressProps } from 'react-player/base';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/file';
import screenfull from 'screenfull';
import Box from '@mui/material/Box';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { IconButton, CenteredContainer } from '@/lib/shared/components/ui';
import { useIsMobileDevice } from '@/lib/shared/hooks/use-is-mobile-device';
import {
    PlayerControls,
    TEST_IDS as PLAYER_CONTROLS_TEST_IDS,
} from './ui/PlayerControls';
import { ErrorMessage } from './ui/ErrorMessage';

export const LOCAL_STORAGE_VOLUME_KEY = 'therify-media-volume' as const;
export const LOCAL_STORAGE_MUTE_KEY = 'therify-media-mute' as const;
const PLAYER_ID = 'therify-media-player' as const;

interface VideoPlayerProps {
    src: string;
    id?: string;
    sx?: SxProps<Theme>;
}
export const TEST_IDS = {
    ...PLAYER_CONTROLS_TEST_IDS,
    START_BUTTON: 'start-button',
};

export const VideoPlayer = ({ src, id, sx }: VideoPlayerProps) => {
    const playerId = id ?? PLAYER_ID;
    const playerRef = useRef<ReactPlayer>(null);
    const volumeDebounceRef = useRef<number>();
    const isMobileDevice = useIsMobileDevice();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [durationSeconds, setDurationSeconds] = useState(0);
    const [progressSeconds, setProgressSeconds] = useState(0);
    const [errorMesage, setErrorMessage] = useState<string>();

    const handlePlayProgress = ({ playedSeconds }: OnProgressProps) => {
        setProgressSeconds(Math.round(playedSeconds));
    };

    const handleSeekEnd = () => {
        playerRef.current?.seekTo(progressSeconds);
        setIsSeeking(false);
    };

    const handleVolumeChange = (volume: number) => {
        if (volume > 0 && isMuted) {
            setIsMuted(false);
        }
        if (volume === 0 && !isMuted) {
            setIsMuted(true);
        }
        setVolume(volume);
        //debounce volume and set to localstorage
        if (typeof window !== 'undefined') {
            window.clearTimeout(volumeDebounceRef?.current);
            volumeDebounceRef.current = window.setTimeout(() => {
                window.localStorage.setItem(
                    LOCAL_STORAGE_VOLUME_KEY,
                    volume.toString()
                );
            }, 200);
        }
    };

    const toggleMute = (muted: boolean) => {
        setIsMuted(muted);
        //debounce volume and set to localstorage
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(
                LOCAL_STORAGE_MUTE_KEY,
                muted.toString()
            );
        }
    };

    const handleFullscreen = () => {
        if (typeof window === 'undefined')
            return console.error('Window not found');
        const el = window.document.getElementById(playerId);
        if (!el) return console.error('Player element not found');
        if (isFullScreen) {
            screenfull.exit().then(() => {
                setIsFullScreen(false);
            });
            return;
        }
        screenfull.request(el).then(() => setIsFullScreen(true));
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const defaultVolume = parseFloat(
                window.localStorage.getItem(LOCAL_STORAGE_VOLUME_KEY) ?? '1'
            );
            if (!isNaN(defaultVolume)) {
                setVolume(defaultVolume);
                if (defaultVolume === 0) {
                    setIsMuted(true);
                }
            }
            const defaultMute = window.localStorage.getItem(
                LOCAL_STORAGE_MUTE_KEY
            );
            setIsMuted(defaultMute === 'true');
        }
    }, []);

    return (
        <Container
            id={playerId}
            isError={!!errorMesage}
            isPlaying={isPlaying}
            onClick={() => {
                if (progressSeconds === durationSeconds) {
                    setProgressSeconds(0);
                }
                setIsPlaying(!isPlaying);
            }}
            sx={sx}
        >
            {errorMesage && <ErrorMessage message={errorMesage} />}
            <ReactPlayer
                ref={playerRef}
                url={src}
                playing={isPlaying && !isSeeking}
                controls={isMobileDevice}
                loop={false}
                light={false}
                volume={volume}
                width="100%"
                height="100%"
                muted={isMuted}
                playIcon={
                    isMobileDevice ? (
                        <StartButton onClick={() => setIsPlaying(true)}>
                            <PlayArrowRounded />
                        </StartButton>
                    ) : undefined
                }
                onProgress={handlePlayProgress}
                onDuration={(duration) =>
                    setDurationSeconds(Math.round(duration))
                }
                onPlay={() => {
                    if (!isSeeking) setIsPlaying(true);
                }}
                onPause={() => {
                    if (!isSeeking) setIsPlaying(false);
                }}
                onError={(error) => {
                    console.error(error);
                    setIsPlaying(false);
                    setErrorMessage(
                        error?.message ??
                            'The video player encountered an unknown error.'
                    );
                }}
            />
            {!isPlaying && !isMobileDevice && !errorMesage && (
                <CenteredContainer
                    fillSpace
                    position="absolute"
                    top="0"
                    left="0"
                    zIndex={2}
                    onClick={() => setIsPlaying(true)}
                >
                    <StartButton data-testid={TEST_IDS.START_BUTTON}>
                        <PlayArrowRounded />
                    </StartButton>
                </CenteredContainer>
            )}
            {!isMobileDevice && (
                <PlayerControls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isFullScreen={isFullScreen}
                    handleFullscreen={handleFullscreen}
                    progressSeconds={progressSeconds}
                    setProgressSeconds={setProgressSeconds}
                    durationSeconds={durationSeconds}
                    isMuted={isMuted}
                    toggleMute={() => toggleMute(!isMuted)}
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    onSeekEnd={handleSeekEnd}
                    onSeekStart={() => setIsSeeking(true)}
                />
            )}
        </Container>
    );
};

const Container = styled(Box, {
    shouldForwardProp: (prop) =>
        !['isPlaying', 'isError'].includes(prop.toString()),
})<{ isPlaying: boolean; isError: boolean }>(
    ({ theme, isPlaying, isError }) => ({
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: theme.shape.borderRadius,
        ...(!isError && {
            '::after': {
                content: '""',
                zIndex: 1,
                position: 'absolute',
                opacity: isPlaying ? 0 : 1,
                transition: 'opacity 0.2s ease-in-out',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                    'linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, .85) 80%)',
            },
            '::before': {
                content: '""',
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                transition: 'opacity 0.2s ease-in-out',
                background: theme.palette.common.black,
            },
        }),
        ':hover::after': {
            opacity: 1,
        },

        ...(!isPlaying && {
            ':hover::before': {
                opacity: 0.1,
            },
        }),

        '> .player-controls': {
            transform: 'translate3d(0,100%,0)',
            transition: 'transform 0.2s ease-in-out',
        },

        ...(!isError && {
            ':hover .player-controls': {
                transform: 'translate3d(0,0,0)',
            },
        }),
    })
);

const StartButton = styled(IconButton)(({ theme }) => ({
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    height: theme.spacing(30),
    width: theme.spacing(30),
    '&:hover': {
        background: theme.palette.common.white,
    },
    '& svg': {
        fontSize: theme.spacing(16),
    },
    [theme.breakpoints.down('sm')]: {
        height: theme.spacing(18),
        width: theme.spacing(18),
        '& svg': {
            fontSize: theme.spacing(10),
        },
    },
}));
