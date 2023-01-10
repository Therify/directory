import * as z from 'zod';
import { createMapper } from './index';

describe('Creating objects using createMapper', function () {
    const schema = z.object({
        favoriteColor: z.string(),
    });
    const sourceObject = {
        profile: {
            color: {
                favorite: 'red',
            },
        },
    };
    const mapper = createMapper(schema);
    test('extracting values from nexted object using generated mapper', function () {
        expect(
            mapper(
                {
                    favoriteColor: 'profile.color.favorite',
                },
                sourceObject
            )
        ).toMatchObject({
            favoriteColor: 'red',
        });
    });
});
