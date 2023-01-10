import * as z from 'zod';
import { mapObject, Mapping } from '../map-object';

export function createMapper<
    RS extends z.ZodRawShape,
    ZO extends z.ZodObject<RS>
>(schema: ZO) {
    return <S extends Record<string, unknown>>(
        mapping: Mapping<z.infer<ZO>, S>,
        sourceObject: S
    ): z.infer<ZO> => {
        const mappedResult = mapObject(mapping, sourceObject);
        return schema.parse(mappedResult);
    };
}
