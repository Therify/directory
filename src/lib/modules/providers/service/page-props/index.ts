import { ProvidersServiceParams } from '../params';
import { GetTherifyUserPageProps } from './get-therify-user-props';
import { practicePagesFactory } from './practice';

export const pagePropsFactory = (params: ProvidersServiceParams) => ({
    getTherifyUserPageProps: GetTherifyUserPageProps.factory(params),
    practice: practicePagesFactory(params),
});
