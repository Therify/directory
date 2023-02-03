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

export interface DirectoryCardProps {
    providerName: string;
    providerCredentials: string;
    providerImageURL: string;
    providerRate: string;
    isFavorite: boolean;
    onClick?: () => void;
}

export function DirectoryCard({
    providerName,
    providerCredentials,
    providerImageURL,
    providerRate,
    isFavorite,
    onClick = () => {},
}: DirectoryCardProps) {
    return (
        <Card>
            <CardMedia
                component="img"
                height={50}
                sx={{ objectFit: 'cover', maxHeight: 236 }}
                image={providerImageURL}
            />
            <Box sx={{ padding: 2 }}>
                <CardContent>
                    <Stack direction="column">
                        <Stack direction="row" justifyContent={'space-between'}>
                            <Box>{providerRate}</Box>
                            <Box>
                                <CardIcon isFavorite={isFavorite}>
                                    {isFavorite ? (
                                        <Favorite />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </CardIcon>
                            </Box>
                        </Stack>
                        <Stack>
                            <ProviderName>{providerName}</ProviderName>
                            <ProviderCredentials>
                                {providerCredentials}
                            </ProviderCredentials>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button fullWidth onClick={onClick}>
                        View
                    </Button>
                </CardActions>
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
    color: isFavorite ? theme.palette.error.main : theme.palette.grey[500],
}));
