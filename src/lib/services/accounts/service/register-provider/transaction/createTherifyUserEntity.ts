import { RegisterProvider } from '@/lib/features/registration';
import type { RegisterProviderTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProvider.Input
    ): RegisterProviderTransaction['createTherifyUserEntity'];
}

export const factory: CreateTherifyUserEntityFactory = ({
    providerDetails: { emailAddress, givenName, surname, dateOfBirth },
}) => {
    return {
        async commit({ orm }) {
            const createdUser = await orm.user.create({
                data: {
                    emailAddress,
                    givenName,
                    surname,
                    dateOfBirth,
                    // TODO: roles: provider
                },
            });
            return {
                therifyUserId: createdUser.id,
            };
        },
        rollback({ orm }, { createTherifyUserEntity: { therifyUserId } }) {
            return orm.user.delete({
                where: {
                    id: therifyUserId,
                },
            });
        },
    };
};
