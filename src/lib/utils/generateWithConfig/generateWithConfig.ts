/**
 * Generates a higher order function that will return config object from configGetter
 * @param configGetter - A function that returns a config object
 * @returns
 */
export function generateWithConfig<Config>(
    configGetter: (overrides?: Partial<Config>) => Config
) {
    return function withConfiguration<Result>(
        fn: (config: Config) => Result,
        overrides = {}
    ) {
        return fn(configGetter(overrides));
    };
}
