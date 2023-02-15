import { InvitationStatus, ProfileType, Role } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ProvidersServiceParams } from '../../params';

export interface ProviderRegisterWithInvitationPageProps {
    profile: {
        givenName: string;
        surname: string;
    } | null;
    role: typeof Role.provider_coach | typeof Role.provider_therapist | null;
    practice: { name: string; id: string } | null;
    recipientEmail: string | null;
    invitationId: string | null;
    invitationStatus: InvitationStatus | null;
    invitationExpirationDate: string | null;
}

const NO_INVITATION_FOUND_PROPS: ProviderRegisterWithInvitationPageProps = {
    profile: null,
    practice: null,
    recipientEmail: null,
    invitationId: null,
    invitationExpirationDate: null,
    role: null,
    invitationStatus: null,
};

export const factory = (params: ProvidersServiceParams) => {
    const getPracticeProfilesPageProps: GetServerSideProps<
        ProviderRegisterWithInvitationPageProps
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
            await params.prisma.practiceProviderInvitation.findFirst({
                where: {
                    id: invitationId,
                },
                select: {
                    recipientEmail: true,
                    expiresAt: true,
                    status: true,
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
        const {
            profile,
            practice,
            recipientEmail,
            status: invitationStatus,
        } = invitation ?? {};
        if (
            !invitation ||
            !profile ||
            !practice ||
            !recipientEmail ||
            !invitationStatus
        ) {
            return {
                props: NO_INVITATION_FOUND_PROPS,
            };
        }
        const role =
            profile.designation === ProfileType.coach
                ? Role.provider_coach
                : Role.provider_therapist;
        const props: ProviderRegisterWithInvitationPageProps = {
            profile,
            practice,
            recipientEmail,
            invitationId,
            invitationStatus,
            role,
            invitationExpirationDate:
                invitation.expiresAt?.toISOString() ?? null,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeProfilesPageProps;
};
