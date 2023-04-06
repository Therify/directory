import { z } from 'zod';
import { PaginatedResponse } from '../paginated-response';

/**
 * `createPaginatedResponse` is a factory function that creates a paginated response schema
 * @param itemsSchema - The schema for the items in the paginated response
 * @returns A paginated response schema
 */
export function createPaginatedResponse<T extends z.ZodTypeAny>(
    itemsSchema: T
) {
    return PaginatedResponse.schema.extend({
        items: z.array(itemsSchema),
    });
}
