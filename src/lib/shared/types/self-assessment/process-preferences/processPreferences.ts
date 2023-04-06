import { isEmptyObject } from '@/lib/shared/utils/is-empty-object';
import { Prisma } from '@prisma/client';
import { Preference } from '../preferences';

export function processPreferences(
    preferences: Prisma.JsonValue | undefined
): Preference.Preference {
    if (!preferences || isEmptyObject(preferences)) return Preference.DEFAULT;
    return Preference.validate(preferences);
}
