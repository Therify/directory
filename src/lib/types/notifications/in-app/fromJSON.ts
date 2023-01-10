import { createMapper } from '@/lib/utils';
import { schema, persistedSchema } from './schema';

export const fromJSON = createMapper(schema);
export const fromPersistedJSON = createMapper(persistedSchema);
