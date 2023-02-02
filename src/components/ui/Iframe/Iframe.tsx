import { SxProps, Theme } from '@mui/material';
import { CenteredContainer } from '../Containers/CenteredContainer';

interface IframeProps {
    src: string;
    title?: string;
    height?: string;
    width?: string;
    sx?: SxProps<Theme>;
}
export const Iframe = ({
    src,
    title,
    height,
    width = '100%',
    sx,
}: IframeProps) => (
    <CenteredContainer height={height} width={width} sx={sx}>
        <iframe
            title={title ?? 'Therify'}
            src={src}
            width="100%"
            height="100%"
            style={{ overflow: 'auto', border: 'none', flex: 1 }}
        />
    </CenteredContainer>
);
