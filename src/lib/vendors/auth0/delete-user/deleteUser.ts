import { BaseAuth0FactoryParams } from '../types';
import { Input } from './schema';

interface DeleteUserFactoryParams extends BaseAuth0FactoryParams {}

interface DeleteUserFactory {
    (params: DeleteUserFactoryParams): {
        (input: Input): Promise<void>;
    };
}

export const factory: DeleteUserFactory = ({ auth0 }) => {
    return function deleteUser({ id }) {
        return new Promise((resolve, reject) => {
            auth0.deleteUser({ id }, (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    };
};
