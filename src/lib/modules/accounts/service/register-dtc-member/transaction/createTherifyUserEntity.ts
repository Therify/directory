import { Role } from '@prisma/client';
import { RegisterDTCMemberTransaction, TRANSACTION_STEPS } from './definition';

export const createTherifyUserEntity: RegisterDTCMemberTransaction['CREATE_THERIFY_USER_ENTRY'] =
    {
        async commit(
            input,
            { orm },
            { [TRANSACTION_STEPS.CREATE_AUTH0_USER]: { auth0UserId } }
        ) {
            const newUser = await orm.user.create({
                data: {
                    id: auth0UserId,
                    emailAddress: input.emailAddress,
                    givenName: input.givenName,
                    surname: input.surname,
                    dateOfBirth: input.dateOfBirth,
                    hasAcceptedTermsAndConditions: true,
                    roles: [Role.member, Role.member_dtc],
                    memberProfile: {
                        create: {
                            state: input.state,
                            country: input.country,
                            insurance: input.insurance,
                            concerns: input.concerns,
                            goals: input.goals,
                        },
                    },
                },
            });
            return {
                therifyUserId: newUser.id,
            };
        },
        async rollback(
            _,
            { orm },
            { [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: { therifyUserId } }
        ) {
            await orm.user.delete({ where: { id: therifyUserId } });
        },
    };
