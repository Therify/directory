import { extractAtPath } from '../extract-at-path';

type Value =
    | string
    | string[]
    | number
    | boolean
    | null
    | undefined
    | Date
    | unknown[];

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;
type DotNestedKeys<T> = (
    T extends Value
        ? ''
        : T extends object
        ? {
              [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
                  DotNestedKeys<T[K]>
              >}`;
          }[Exclude<keyof T, symbol>]
        : ''
) extends infer D
    ? Extract<D, string>
    : never;
export type Mapping<
    T = Record<string, unknown>,
    S = Record<string, unknown>
> = {
    [key in keyof T]: T[key] extends Value
        ? DotNestedKeys<S> | [DotNestedKeys<S>, (value: T[key]) => unknown]
        : Mapping<T[key], S>;
};

export function mapObject<
    T extends Record<string, unknown>,
    S extends Record<string, unknown>
>(map: Mapping<T, S>, sourceObject: S): unknown {
    const result: Record<string, unknown> = {};
    for (const [key, mapping] of Object.entries(map)) {
        const isNested = mapping instanceof Object;
        const isTransform = Array.isArray(mapping);
        const isPath = typeof mapping === 'string';
        if (isNested) {
            result[key] = mapObject(map[key] as Mapping, sourceObject);
        }
        if (isTransform) {
            const [path, transform] = mapping as unknown as [
                string,
                CallableFunction
            ];
            const value = extractAtPath(sourceObject, path);
            result[key] = transform(value);
        }
        if (isPath) {
            const containsDotNotation = mapping.includes('.');
            if (!containsDotNotation) {
                result[key] = sourceObject[mapping];
                continue;
            }
            result[key] = extractAtPath(sourceObject, mapping);
        }
    }
    return result;
}
