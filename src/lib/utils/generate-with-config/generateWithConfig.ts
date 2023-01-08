/**
 * Generates a higher order function that will returned config object from configGetter
 * @param configGetter - A function that returns the config object
 * @returns
 */
export function generateWithConfig<Config>(
    configGetter: (overrides?: Partial<Config>) => Config
) {
    return function withConfig<Result>(
        fn: (config: Config) => Result,
        overrides = {}
    ) {
        return fn(configGetter(overrides));
    };
}
