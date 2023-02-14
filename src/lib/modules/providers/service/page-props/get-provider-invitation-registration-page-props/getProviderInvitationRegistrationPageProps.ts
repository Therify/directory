import { ProviderProfile } from '@/lib/shared/types';
import { GetServerSideProps } from 'next';
import { ProvidersServiceParams } from '../../params';

export interface ProviderInvitationRegistrationPageProps {
    profile: {
        givenName: string;
        surname: string;
        designation: ProviderProfile.ProviderProfile['designation'];
    } | null;
    practice: { name: string; id: string } | null;
    recipientEmail: string | null;
    invitationId: string | null;
    invitationExpirationDate: string | null;
}

const NO_INVITATION_FOUND_PROPS: ProviderInvitationRegistrationPageProps = {
    profile: null,
    practice: null,
    recipientEmail: null,
    invitationId: null,
    invitationExpirationDate: null,
};

export const factory = (params: ProvidersServiceParams) => {
    const getPracticeProfilesPageProps: GetServerSideProps<
        ProviderInvitationRegistrationPageProps
    > = async (context) => {
        const { invitationId: rawInvitationId } = context.params ?? {};
        const invitationId = Array.isArray(rawInvitationId)
            ? rawInvitationId[0]
            : rawInvitationId;
        if (!invitationId) {
            return {
                props: NO_INVITATION_FOUND_PROPS,
            };
        }

        const invitation =
            await params.prisma.practiceProviderInvitation.findUnique({
                where: {
                    id: invitationId,
                },
                select: {
                    recipientEmail: true,
                    expiresAt: true,
                    practice: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                    profile: {
                        select: {
                            designation: true,
                            givenName: true,
                            surname: true,
                        },
                    },
                },
            });
        const { profile, practice, recipientEmail } = invitation ?? {};
        if (!invitation || !profile || !practice || !recipientEmail) {
            return {
                props: NO_INVITATION_FOUND_PROPS,
            };
        }

        const props: ProviderInvitationRegistrationPageProps = {
            profile,
            practice,
            recipientEmail,
            invitationId,
            invitationExpirationDate:
                invitation.expiresAt?.toISOString() ?? null,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeProfilesPageProps;
};
