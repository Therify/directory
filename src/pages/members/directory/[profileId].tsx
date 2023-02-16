import { ProviderProfile } from '@/lib/modules/directory/components/ProviderProfile';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages/MemberNavigationPage';
import { membersService } from '@/lib/modules/members/service';
import { DirectoryProfilePageProps } from '@/lib/modules/members/service/get-directory-profile-props/getDirectoryProfileProps';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Modal } from '@/lib/shared/components/ui/Modal';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Paragraph } from '@/lib/shared/components/ui/Typography';
import { Textarea } from '@/lib/shared/components/ui/FormElements/Input/Textarea';
import { trpc } from '@/lib/shared/utils/trpc';

function formatModalTitle(providerName?: string) {
    return providerName ? 'Connect with ' + providerName : 'Get Connected';
}
function formatModalDescription(providerName?: string) {
    return providerName
        ? `Consider sharing more about what you’d like to focus on with ${providerName} (optional).`
        : 'Consider sharing more about what you’d like to focus on (optional).';
}

export default function ProviderProfilePage({
    providerProfile,
    user,
    providerHasBeenSelected,
    isFavorite,
}: DirectoryProfilePageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [connectionMessage, setConnectionMessage] = useState('');
    const [isCurrentlyFavorited, setIsCurrentlyFavorited] = useState(
        isFavorite ?? false
    );
    const [isProviderSelected, setIsProviderSelected] = useState(
        providerHasBeenSelected ?? false
    );
    const mutation = trpc.useMutation('directory.create-connection-request');
    const favorite = trpc.useMutation('members.favorite-profile');
    return (
        <MemberNavigationPage
            user={user}
            currentPath={URL_PATHS.MEMBERS.DIRECTORY}
        >
            <ProviderProfile
                {...providerProfile}
                member={user}
                isFavorited={isFavorite}
                onFavorite={(setIsFavorite) => () => {
                    favorite.mutate(
                        {
                            profileId: providerProfile.id!,
                            memberId: user.userId,
                            isFavorite: isCurrentlyFavorited,
                        },
                        {
                            onSuccess: ({ isFavorite }) =>
                                setIsFavorite(isFavorite),
                            onSettled() {
                                setIsCurrentlyFavorited(!isCurrentlyFavorited);
                            },
                        }
                    );
                }}
                providerHasBeenSelected={isProviderSelected}
                onConnectionRequest={() => {
                    setIsModalOpen(true);
                }}
            />
            <Modal
                title={formatModalTitle(providerProfile?.givenName)}
                primaryButtonText="Confirm"
                primaryButtonOnClick={() => {
                    mutation.mutate(
                        {
                            memberId: user.userId,
                            profileId: providerProfile.id!,
                            connectionMessage,
                        },
                        {
                            onSuccess: () => {
                                setIsModalOpen(false);
                                setConnectionMessage('');
                            },
                            onSettled: () => {
                                setIsProviderSelected(true);
                            },
                        }
                    );
                }}
                secondaryButtonText="Cancel"
                secondaryButtonOnClick={() => {
                    setIsModalOpen(false);
                    setConnectionMessage('');
                }}
                isOpen={isModalOpen}
                fullWidthButtons
                postBodySlot={
                    <Box>
                        <Paragraph>
                            {formatModalDescription(providerProfile?.givenName)}
                        </Paragraph>
                        <Textarea
                            fullWidth
                            value={connectionMessage}
                            onChange={(e) =>
                                setConnectionMessage(e.target.value)
                            }
                        />
                    </Box>
                }
                onClose={() => {
                    setIsModalOpen(false);
                    setConnectionMessage('');
                }}
            />
        </MemberNavigationPage>
    );
}

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getDirectoryProfilePageProps,
    })
);
