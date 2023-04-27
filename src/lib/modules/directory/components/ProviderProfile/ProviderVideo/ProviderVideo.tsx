import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { type ProviderProfile } from '@/lib/shared/types';
import { H6, Modal, Paragraph } from '@/lib/shared/components/ui';
import { ArrowRight } from '@mui/icons-material';
import { VideoPlayer } from '@/lib/shared/components/ui/VideoPlayer';
import React from 'react';

type ProviderVideoProps = Pick<
    ProviderProfile.ProviderProfile,
    'profileImageUrl' | 'givenName'
> & {
    videoPlayerProps: React.ComponentProps<typeof VideoPlayer>;
};

export function ProviderVideo({
    profileImageUrl,
    givenName,
    videoPlayerProps,
}: ProviderVideoProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <Box>
            <VideoContainer
                direction="row"
                onClick={() => setIsModalOpen(true)}
            >
                <PreviewImage profileImageUrl={profileImageUrl}>
                    <PlayButtonContainer>
                        <StyledPlayButton />
                    </PlayButtonContainer>
                </PreviewImage>
                <VideoDescription>
                    <Stack>
                        <VideoTitle>Get to know {givenName}</VideoTitle>
                        <VideoSubtitle>
                            A short video about {givenName}
                        </VideoSubtitle>
                    </Stack>
                </VideoDescription>
            </VideoContainer>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Get to know ${givenName}`}
                style={{ width: '100%', maxWidth: 800, minHeight: 500 }}
                postBodySlot={
                    <Box sx={{ height: '100%', width: '100%' }}>
                        <VideoPlayer {...videoPlayerProps} controls />
                    </Box>
                }
            />
        </Box>
    );
}

const VideoContainer = styled(Stack)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(1),
    height: 125,
    overflow: 'hidden',
    transition: 'all 0.2s ease-in-out',
    [':hover']: {
        cursor: 'pointer',
        transform: 'scale(1.005)',
    },
}));
const PreviewImage = styled(Box)<Pick<ProviderVideoProps, 'profileImageUrl'>>(
    ({ theme, profileImageUrl }) => ({
        maxWidth: 175,
        position: 'relative',
        backgroundImage: `url(${profileImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ['::after']: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.2)',
            zIndex: 1,
        },
    })
);
const PlayButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: 50,
    height: 50,
    background: '#fff',
    zIndex: 2,
}));
const StyledPlayButton = styled(ArrowRight)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 50,
}));
const VideoDescription = styled(Box)(({ theme }) => ({
    flex: 1,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
}));
const VideoTitle = styled(H6)(({ theme }) => ({
    ...theme.typography.body1,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
}));
const VideoSubtitle = styled(Paragraph)(({ theme }) => ({
    ...theme.typography.body2,
    fontSize: theme.typography.pxToRem(16),
}));
