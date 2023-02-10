import { get } from 'env-var';
import { generateWithConfig } from '../utils';

export const NODE_ENV = 'NODE_ENV' as const;

export interface NodeEnvironmentConfiguration {
    readonly NODE_ENV: 'development' | 'test' | 'production';
}

export const getNodeEnvironmentConfiguration = (
    overrides: Partial<NodeEnvironmentConfiguration> = {}
): NodeEnvironmentConfiguration => {
    return {
        [NODE_ENV]: get(NODE_ENV)
            .required()
            .asEnum(['development', 'test', 'production']),
        ...overrides,
    };
};

export const withNodeEnvironmentConfiguration = generateWithConfig(
    getNodeEnvironmentConfiguration
);
