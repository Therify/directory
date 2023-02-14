import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { InvitationStatus } from '@prisma/client';
import { addDays } from 'date-fns';
import { CreatePracticeProviderInvitationTransaction } from './definition';

export const factory: (
    input: CreatePracticeProviderInvitation.Input
) => CreatePracticeProviderInvitationTransaction['validateUniqueEmail'] = ({
    recipientEmail,
}) => {
    return {
        async commit({ prisma }) {
            const user = await prisma.user.findFirst({
                where: {
                    emailAddress: recipientEmail,
                },
            });

            const activeInvitation =
                await prisma.practiceProviderInvitation.findFirst({
                    where: {
                        recipientEmail,
                        status: {
                            in: [
                                InvitationStatus.pending,
                                InvitationStatus.accepted,
                            ],
                        },
                    },
                });
            if (activeInvitation)
                throw new Error(
                    `${recipientEmail} has already been invited to join Therify. Emails can only have one active invitation at a time.`
                );
            if (user)
                throw new Error(
                    'A user already exists with this email address.'
                );

            return;
        },
        rollback() {},
    };
};
