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
import { H4 } from '@/components/ui/Typography/Headers';
import { Subhead } from '@/components/ui/Typography/Subhead';
import { Button } from '@/components/ui/Button';
import { ProviderProfile } from '@prisma/client';
import React from 'react';

export const DEFAULT_PROFILE_IMAGE_URL =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1675367176/app.therify.co/placeholders/profile_placeholder_aacskl.png' as const;

type onFavoriteActionResult = (result: boolean) => void;
export type DirectoryCardProps = {
    isFavorite?: boolean;
    handleFavoriteClicked?: (
        callback: React.Dispatch<React.SetStateAction<boolean>>
    ) => () => void;
    onClick?: () => void;
} & ProviderProfile;

function formatProviderName({
    givenName,
    surname,
}: Pick<ProviderProfile, 'givenName' | 'surname'>) {
    return `${givenName} ${surname}`;
}

function formatProviderRate({
    minimumRate,
    maximumRate,
}: Pick<ProviderProfile, 'minimumRate' | 'maximumRate'>) {
    return maximumRate ? `${minimumRate} - ${maximumRate}` : minimumRate;
}

export function DirectoryCard({
    givenName,
    surname,
    profileImageUrl,
    licenses,
    minimumRate,
    maximumRate,
    isFavorite = false,
    handleFavoriteClicked,
    onClick,
}: DirectoryCardProps) {
    const [isProviderFavorite, setIsProviderFavorite] =
        React.useState(isFavorite);
    return (
        <Card>
            <CardMedia
                component="img"
                height={50}
                sx={{ objectFit: 'cover', maxHeight: 236 }}
                image={profileImageUrl ?? DEFAULT_PROFILE_IMAGE_URL}
                alt="Profile Image"
            />
            <Box sx={{ padding: 2 }}>
                <CardContent>
                    <Stack direction="column">
                        <Stack direction="row" justifyContent={'space-between'}>
                            <Box>
                                $
                                {formatProviderRate({
                                    minimumRate,
                                    maximumRate,
                                })}
                            </Box>
                            {handleFavoriteClicked && (
                                <Box>
                                    <CardIcon
                                        isFavorite={isProviderFavorite}
                                        onClick={handleFavoriteClicked(
                                            setIsProviderFavorite
                                        )}
                                    >
                                        {isFavorite ? (
                                            <Favorite />
                                        ) : (
                                            <FavoriteBorder />
                                        )}
                                    </CardIcon>
                                </Box>
                            )}
                        </Stack>
                        <Stack>
                            <ProviderName>
                                {formatProviderName({
                                    givenName,
                                    surname,
                                })}
                            </ProviderName>
                            {licenses && (
                                <ProviderCredentials>
                                    {licenses}
                                </ProviderCredentials>
                            )}
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
    color: isFavorite ? theme.palette.error.main : theme.palette.grey[500],
    '&:hover': {
        transform: 'scale(1.1)',
        cursor: 'pointer',
    },
}));
