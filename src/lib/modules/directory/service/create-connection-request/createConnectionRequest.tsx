import { CreateConnectionRequest } from '@/lib/modules/directory/features';
import { DirectoryServiceParams } from '../param';
import { VendorInngest } from '@/lib/shared/vendors/inngest/inngest';
import { SendConnectionRequestEmail } from '@/lib/shared/vendors/inngest';

interface CreateConnectionFactoryParams extends DirectoryServiceParams {}

export const factory = ({ prisma }: CreateConnectionFactoryParams) => {
    return async function createConnectionRequest(
        input: CreateConnectionRequest.Input
    ): Promise<CreateConnectionRequest.Output> {
        const { memberId, profileId } = input;
        try {
            const [memberProfile, providerProfile, account] = await Promise.all(
                [
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
                    }),
                    prisma.account.findFirst({
                        where: {
                            users: {
                                some: {
                                    id: memberId,
                                },
                            },
                        },
                        include: {
                            plans: {
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 1,
                            },
                        },
                    }),
                ]
            );
            const { user, state, insurance } = memberProfile;
            let planDetails = undefined;
            if (account && account.plans.length > 0) {
                const [plan] = account.plans;
                planDetails = {
                    numberOfCoveredSessions: plan.coveredSessions,
                    planName: account.name,
                };
            }
            await prisma.connectionRequest.create({
                data: input,
            });
            await VendorInngest.send(SendConnectionRequestEmail.EVENT_NAME, {
                data: {
                    to: [
                        providerProfile.contactEmail,
                        user.emailAddress,
                        'help@therify.co',
                    ],
                    props: {
                        member: {
                            givenName: user.givenName,
                            surname: user.surname,
                            emailAddress: user.emailAddress,
                            state,
                            insurance,
                            concerns: memberProfile.concerns,
                        },
                        plan: planDetails ?? undefined,
                        provider: {
                            givenName: providerProfile.givenName,
                        },
                    },
                    subject: `New referral from Therify - ${user.givenName} ${user.surname}`,
                },
            });
            return {
                success: true,
                errors: [],
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                errors: [],
            };
        }
    };
};
