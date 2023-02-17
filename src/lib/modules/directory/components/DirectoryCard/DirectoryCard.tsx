import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Icon, { IconProps } from '@mui/material/Icon';
import { H4 } from '@/lib/shared/components/ui/Typography/Headers';
import { Subhead } from '@/lib/shared/components/ui/Typography/Subhead';
import { Button } from '@/lib/shared/components/ui/Button';
import React from 'react';
import Lottie from 'react-lottie';
import ANIMATION_DATA from './favoriteAnimation.json';
import { DirectoryProfile } from '@/lib/shared/types/presentation';
import { Badge } from '@/lib/shared/components/ui';

export const DEFAULT_PROFILE_IMAGE_URL =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1675367176/app.therify.co/placeholders/profile_placeholder_aacskl.png' as const;

export type DirectoryCardProps = {
    isFavorite?: boolean;
    handleFavoriteClicked?: (
        callback: (isFavorite: boolean) => void
    ) => () => void;
    onClick?: () => void;
} & DirectoryProfile.DirectoryProfileCard;

const DEFAULT_ANIMATION_OPTIONS = {
    loop: false,
    animationData: ANIMATION_DATA,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        overflow: 'visible',
    },
};

interface RenderFavoriteAnimationProps {
    isStopped: boolean;
    isPaused: boolean;
    callback: () => void;
}
function renderFavoriteAnimation({
    isStopped,
    isPaused,
    callback,
}: RenderFavoriteAnimationProps) {
    return (
        <Lottie
            options={DEFAULT_ANIMATION_OPTIONS}
            isStopped={isStopped}
            isPaused={isPaused}
            eventListeners={[
                {
                    eventName: 'complete',
                    callback,
                },
            ]}
        />
    );
}

interface RenderFavoriteIconProps {
    isFavorite: boolean;
    isStopped: boolean;
    isPaused: boolean;
    callback: () => void;
    isAnimating: boolean;
}

function renderFavoriteIcon({
    isFavorite,
    isPaused,
    isStopped,
    callback,
    isAnimating,
}: RenderFavoriteIconProps) {
    if (isAnimating) {
        return renderFavoriteAnimation({
            isStopped,
            isPaused,
            callback,
        });
    }
    if (isFavorite) {
        return <Favorite />;
    }
    return <FavoriteBorder />;
}

export function DirectoryCard({
    licenses,
    providerName,
    designation,
    profileImageUrl,
    isFavorite = false,
    handleFavoriteClicked = () => () => {},
    onClick,
}: DirectoryCardProps) {
    const [isProviderFavorite, setIsProviderFavorite] =
        React.useState(isFavorite);
    const [isStopped, setIsStopped] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    return (
        <Card
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardMedia
                component="img"
                height={50}
                sx={{ objectFit: 'cover', maxHeight: 236 }}
                image={profileImageUrl ?? DEFAULT_PROFILE_IMAGE_URL}
                alt="Profile Image"
            />
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardContent>
                    <Stack direction="column">
                        <Stack direction="row" justifyContent={'space-between'}>
                            <Box sx={{ mb: 2 }}>
                                {designation === 'coach' ? (
                                    <Badge size="small" color="primary-light">
                                        Mental Health Coach
                                    </Badge>
                                ) : (
                                    <Badge size="small" color="success">
                                        Therapist
                                    </Badge>
                                )}
                            </Box>
                            {handleFavoriteClicked && (
                                <Box>
                                    <CardIcon
                                        title={`Add ${providerName} to your favorite providers`}
                                        isFavorite={isProviderFavorite}
                                        onClick={handleFavoriteClicked(
                                            (isNowFavorited: boolean) => {
                                                if (isNowFavorited) {
                                                    setIsProviderFavorite(true);
                                                    setIsStopped(false);
                                                    setIsPaused(false);
                                                    setIsAnimating(true);
                                                }
                                                setIsProviderFavorite(
                                                    isNowFavorited
                                                );
                                            }
                                        )}
                                    >
                                        {renderFavoriteIcon({
                                            isFavorite: isProviderFavorite,
                                            isStopped,
                                            isPaused,
                                            isAnimating,
                                            callback: () => {
                                                console.log('complete');
                                                setIsAnimating(false);
                                                setIsStopped(true);
                                                setIsPaused(true);
                                            },
                                        })}
                                    </CardIcon>
                                </Box>
                            )}
                        </Stack>
                        <Stack>
                            <ProviderName>{providerName}</ProviderName>
                            <ProviderCredentials>
                                {licenses.length > 0 && licenses.join(', ')}
                            </ProviderCredentials>
                        </Stack>
                    </Stack>
                </CardContent>
                {onClick && (
                    <CardActions>
                        <Button fullWidth onClick={onClick}>
                            View
                        </Button>
                    </CardActions>
                )}
            </Box>
        </Card>
    );
}

const ProviderName = styled(H4)(({ theme }) => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(-1),
}));

const ProviderCredentials = styled(Subhead)(({ theme }) => ({
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,
    marginBottom: theme.spacing(0),
}));

interface CardIconProps extends IconProps {
    isFavorite?: boolean;
}

const CardIcon = styled(Icon, {
    shouldForwardProp: (prop) => prop !== 'isFavorite',
})<CardIconProps>(({ theme, isFavorite }) => ({
    transition: 'transform 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    color: isFavorite ? theme.palette.error.main : theme.palette.grey[500],
    '&:hover': {
        transform: 'scale(1.1)',
        cursor: 'pointer',
    },
    '& > div[aria-label="animation"]': {
        overflow: 'visible !important',
        '& > svg': {
            overflow: 'visible !important',
            width: '75px !important',
            height: '75px !important',
            position: 'relative',
            top: '-25px',
        },
    },
}));
