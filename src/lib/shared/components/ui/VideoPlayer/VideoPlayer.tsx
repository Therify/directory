import ReactPlayer, { ReactPlayerProps } from 'react-player';

interface VideoPlayerProps extends ReactPlayerProps {}

export function VideoPlayer(props: VideoPlayerProps) {
    return <ReactPlayer width="100%" height="100%" {...props} />;
}
