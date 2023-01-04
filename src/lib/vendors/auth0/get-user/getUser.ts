import { BaseAuth0FactoryParams } from '../types';
import type { Input, Output } from './schema';

interface GetUserFactoryParams extends BaseAuth0FactoryParams {}

interface GetUserFactory {
    (params: GetUserFactoryParams): {
        (input: Input): Promise<Output>;
    };
}

export const factory: GetUserFactory = ({ auth0 }) => {
    return function getUser(input) {
        return new Promise((resolve, reject) => {
            auth0.getUser(input, (error, user) => {
                if (error) reject(error);
                resolve(user);
            });
        });
    };
};
