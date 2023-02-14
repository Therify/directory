import { CreateConnectionRequest } from '@/lib/modules/directory/features';
import { DirectoryServiceParams } from '../param';
import sendMail from '@/emails';
import ReferralEmail from '@/emails/ReferralEmail';

interface CreateConnectionFactoryParams extends DirectoryServiceParams {}

export const factory = ({ prisma }: CreateConnectionFactoryParams) => {
    return async function createConnectionRequest(
        input: CreateConnectionRequest.Input
    ): Promise<CreateConnectionRequest.Output> {
        const { memberId, profileId } = input;
        try {
            const [_, memberProfile, providerProfile, account] =
                await Promise.all([
                    prisma.connectionRequest.create({
                        data: input,
                    }),
                    prisma.memberProfile.findFirstOrThrow({
                        where: {
                            userId: memberId,
                        },
                        include: {
                            user: true,
                        },
                    }),
                    prisma.providerProfile.findFirstOrThrow({
                        where: {
                            id: profileId,
                        },
                        include: {
                            user: true,
                        },
                    }),
                    prisma.account.findFirstOrThrow({
                        where: {
                            users: {
                                some: {
                                    id: memberId,
                                },
                            },
                        },
                        include: {
                            plan: {
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 1,
                            },
                        },
                    }),
                ]);
            const { user, state, insurance } = memberProfile;
            let planDetails = undefined;
            if (account?.plan) {
                const [plan] = account.plan;
                planDetails = {
                    numberOfCoveredSessions: plan.coveredSessions,
                    planName: account.name,
                };
            }
            await sendMail({
                component: (
                    <ReferralEmail
                        member={{
                            givenName: user.givenName,
                            surname: user.surname,
                            emailAddress: user.emailAddress,
                            state,
                            insurance,
                            concerns: [],
                        }}
                        plan={planDetails ?? undefined}
                        provider={{
                            givenName: providerProfile.givenName,
                        }}
                    />
                ),
                to: [
                    providerProfile.contactEmail,
                    user.emailAddress,
                    'help@therify.co',
                ],
                subject: `New referral from Therify - ${user.givenName} ${user.surname}`,
            });
            return {
                success: true,
                errors: [],
            };
        } catch (error) {
            return {
                success: false,
                errors: [],
            };
        }
    };
};
