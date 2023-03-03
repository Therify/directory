import { DirectoryServiceParams } from '../params';
import { UpdateConnectionRequestStatus } from '@/lib/modules/directory/features';
import sendMail from '@/emails';
import AcceptRequest from '@/emails/AcceptRequest';
import DeclineRequestEmail from '@/emails/DeclineRequest';

export function factory({ prisma, messaging }: DirectoryServiceParams) {
    return async function ({
        profileId,
        memberId,
        userId,
        connectionStatus,
    }: UpdateConnectionRequestStatus.Input): Promise<
        Omit<UpdateConnectionRequestStatus.Output, 'errors'>
    > {
        const [connectionRequest, member] = await Promise.all([
            prisma.connectionRequest.findFirstOrThrow({
                where: {
                    memberId,
                    profileId,
                },
                select: {
                    providerProfile: {
                        select: {
                            userId: true,
                            givenName: true,
                            practiceProfile: {
                                select: {
                                    practice: {
                                        select: {
                                            practiceOwnerId: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            prisma.user.findFirstOrThrow({
                select: {
                    emailAddress: true,
                    givenName: true,
                },
                where: {
                    id: memberId,
                },
            }),
        ]);
        const profileOwnerId = connectionRequest.providerProfile.userId;
        const practiceOwnerId =
            connectionRequest.providerProfile?.practiceProfile?.practice
                ?.practiceOwnerId;

        const isProfileOwner = !!profileOwnerId && profileOwnerId === userId;
        const isPracticeOwner = !!practiceOwnerId && practiceOwnerId === userId;
        const providerName = connectionRequest.providerProfile.givenName;
        if (!isProfileOwner && !isPracticeOwner) {
            throw new Error('User cannot perform this action.');
        }

        await prisma.connectionRequest.update({
            where: {
                memberId_profileId: {
                    memberId,
                    profileId,
                },
            },
            data: {
                connectionStatus,
            },
        });
        if (connectionStatus === 'accepted') {
            const { givenName, emailAddress } = member;
            await sendMail({
                to: [emailAddress],
                component: (
                    <AcceptRequest
                        memberName={givenName}
                        providerName={providerName}
                    />
                ),
            });
        }
        if (connectionStatus === 'declined') {
            const { givenName, emailAddress } = member;
            await sendMail({
                to: [emailAddress],
                component: (
                    <DeclineRequestEmail
                        memberName={givenName}
                        providerName={providerName}
                    />
                ),
            });
        }
        await messaging.createChannel({
            memberId,
            profileId,
        });
        return {
            success: true,
        };
    };
}
