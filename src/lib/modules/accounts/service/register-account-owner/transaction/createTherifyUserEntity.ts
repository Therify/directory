import { RegisterAccountOwner, TRANSACTION_STEPS } from './definition';

export const createTherifyUserEntity: RegisterAccountOwner['CREATE_THERIFY_USER_ENTRY'] =
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
                    roles: ['member', 'account_owner'],
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
            input,
            { orm },
            { [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: { therifyUserId } }
        ) {
            await orm.user.delete({ where: { id: therifyUserId } });
        },
    };
