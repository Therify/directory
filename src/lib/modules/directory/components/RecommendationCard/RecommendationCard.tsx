import {
    Avatar,
    AVATAR_SIZE,
    Button,
    BUTTON_TYPE,
    Card,
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/lib/shared/components/ui';
import {
    VideoCameraFront,
    VideoCameraFrontOutlined,
} from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as ProviderProfile from '@/lib/shared/types/provider-profile/providerProfile';
import { z } from 'zod';
import router from 'next/router';
import { renderDesignation } from '@/lib/shared/types/provider-profile/render-designation/renderDesignation';

const recommendationCardSchema = ProviderProfile.schema.pick({
    id: true,
    profileImageUrl: true,
    givenName: true,
    surname: true,
    designation: true,
    offersVirtual: true,
    offersInPerson: true,
    specialties: true,
});

type RecommendationCardProps = {
    recommendation: z.infer<typeof recommendationCardSchema>;
};

export function RecommendationCard({
    recommendation,
}: RecommendationCardProps) {
    return (
        <Card
            sx={{ bgcolor: 'white' }}
            withBoxShadow
            headerSlot={
                <Stack spacing={4}>
                    <Avatar
                        size={AVATAR_SIZE.XLARGE}
                        src={recommendation.profileImageUrl || undefined}
                    />
                    <Stack spacing={0}>
                        <Paragraph
                            mb={0}
                            sx={{ fontSize: '22px', fontWeight: 'bold' }}
                        >
                            {recommendation.givenName} {recommendation.surname}
                        </Paragraph>
                        <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                            {renderDesignation(recommendation)}
                        </Paragraph>
                    </Stack>
                    <Stack direction={'row'}>
                        {recommendation.offersVirtual && (
                            <SessionTypeChip
                                label="Virtual"
                                size="small"
                                icon={<VideoCameraFrontOutlined />}
                                variant="outlined"
                                color="primary"
                            />
                        )}
                        {recommendation.offersInPerson && (
                            <SessionTypeChip
                                label="In-Person"
                                size="small"
                                icon={<VideoCameraFront />}
                                variant="outlined"
                                color="primary"
                            />
                        )}
                    </Stack>
                </Stack>
            }
            preBodySlot={<hr />}
            postBodySlot={
                <Stack>
                    <Paragraph
                        size={PARAGRAPH_SIZE.SMALL}
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        <span style={{ fontWeight: 'bold' }}>
                            Specializes in:{' '}
                        </span>
                        {recommendation.specialties.join(', ')}
                        <br />
                    </Paragraph>
                    <Button
                        type={BUTTON_TYPE.TEXT}
                        onClick={() => {
                            router.push({
                                pathname: `/members/directory/${recommendation.id}`,
                                query: { selectProvider: true },
                            });
                        }}
                    >
                        Select Provider
                    </Button>
                </Stack>
            }
            primaryButtonOnClick={() => {
                router.push(`/members/directory/${recommendation.id}`);
            }}
            fullWidthButton
            primaryButtonText={'View'}
        />
    );
}

const SessionTypeChip = styled(Chip)(({ theme }) => ({
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(2),
}));
