jest.mock('react-player/file', () => MockReactPlayer);
jest.mock('@/lib/shared/hooks/use-is-mobile-device', () => ({
    useIsMobileDevice: () => isMobileDevice,
}));

import { fireEvent, render } from '@testing-library/react';
import { useEffect } from 'react';
import { OnProgressProps } from 'react-player/base';
import { LOCAL_STORAGE_MUTE_KEY, TEST_IDS, VideoPlayer } from './VideoPlayer';

interface MockReactPlayerProps {
    url: string;
    playing?: boolean;
    onError: (error: Error) => void;
    onDuration: (duration: number) => void;
    onProgress: (progress: OnProgressProps) => void;
}

let isError = false;
let isMobileDevice = false;
let durationSeconds = 120;
let progressSeconds = 0;
let videoSrc = '';
const errorMesage = 'We tested an error message';
const onPlay = jest.fn();
const onPause = jest.fn();

function MockReactPlayer({
    url,
    onError,
    playing,
    onDuration,
    onProgress,
}: MockReactPlayerProps) {
    const isProgress = progressSeconds > 0;
    useEffect(() => {
        if (isError) {
            onError(new Error(errorMesage));
        }
    }, [onError]);

    useEffect(() => {
        if (playing === true) {
            onPlay();
            return;
        }
        if (playing === false) {
            onPause();
            return;
        }
    }, [playing]);

    useEffect(() => {
        onDuration(durationSeconds);
    }, [onDuration]);

    useEffect(() => {
        if (isProgress) {
            onProgress({ playedSeconds: progressSeconds } as OnProgressProps);
        }
    }, [onProgress, isProgress]);

    useEffect(() => {
        videoSrc = url;
    }, [url]);
    return <div />;
}
describe('VideoPlayer', () => {
    beforeEach(() => {
        isError = false;
        isMobileDevice = false;
        videoSrc = '';
        durationSeconds = 120;
        progressSeconds = 0;
        onPlay.mockReset();
        onPause.mockReset();
        localStorage.clear();
    });
    it('shows error message', () => {
        isError = true;
        const { getByText } = render(<VideoPlayer src="" />);
        expect(getByText(errorMesage)).toBeVisible();
    });

    it('does not render controls when on mobile device', () => {
        isMobileDevice = true;
        const { queryByTestId } = render(<VideoPlayer src="" />);
        expect(queryByTestId(TEST_IDS.PLAYER_CONTROLS)).toBeNull();
    });

    it('renders controls when not on mobile device', () => {
        isMobileDevice = false;
        const { getByTestId } = render(<VideoPlayer src="" />);
        expect(getByTestId(TEST_IDS.PLAYER_CONTROLS)).toBeInTheDocument();
    });

    it('calls onPlay when video plays', () => {
        const { getByTestId } = render(<VideoPlayer src="" />);
        const button = getByTestId(TEST_IDS.START_BUTTON);
        fireEvent.click(button);
        expect(onPlay).toHaveBeenCalledTimes(1);
    });

    it('calls onPause when video stops', () => {
        const { getByTestId } = render(<VideoPlayer src="" />);
        const button = getByTestId(TEST_IDS.START_BUTTON);
        fireEvent.click(button);
        fireEvent.click(button);
        expect(onPause).toHaveBeenCalledTimes(1);
    });

    it('stores mute value in localstorage', () => {
        const { getByTestId } = render(<VideoPlayer src="" />);
        const button = getByTestId(TEST_IDS.MUTE_BUTTON);
        fireEvent.click(button);
        expect(localStorage.getItem(LOCAL_STORAGE_MUTE_KEY)).toBe('true');
        fireEvent.click(button);
        expect(localStorage.getItem(LOCAL_STORAGE_MUTE_KEY)).toBe('false');
    });

    it('handles onDuration ', () => {
        const { getByText } = render(<VideoPlayer src="" />);
        const duration = getByText('0:00/2:00');
        expect(duration).toBeVisible();
    });

    it('handles onProgress', () => {
        progressSeconds = 65;
        const { getByText } = render(<VideoPlayer src="" />);
        const duration = getByText('1:05/2:00');
        expect(duration).toBeVisible();
    });

    it('passes video src to react-player', () => {
        const src = 'https://therify.co';
        expect(videoSrc).toBe('');
        render(<VideoPlayer src={src} />);
        expect(videoSrc).toBe(src);
    });
});