import { mapObject } from './index';

describe('mapObjec()', function () {
    describe('simple mappings', function () {
        test('transforming an objects keys', function () {
            const obj = {
                name: 'James Murrary',
            };
            expect(mapObject({ fullName: 'name' }, obj)).toEqual({
                fullName: 'James Murrary',
            });
        });
    });
    describe('objects with nested values', function () {
        it('should traverse nested properties', function () {
            const obj = {
                name: {
                    first: 'James',
                    last: 'Murrary',
                },
            };
            expect(mapObject({ givenName: 'name.first' }, obj)).toEqual({
                givenName: 'James',
            });
        });
    });

    describe("Applying a mapping's transform function", function () {
        it('should apply the transform function to the value', function () {
            const obj = {
                name: {
                    first: 'James',
                    last: 'Murrary',
                },
                age: '30',
            };
            expect(
                mapObject(
                    {
                        fullName: {
                            given: 'name.first',
                            family: 'name.last',
                        },
                        age: ['age', parseFloat],
                    },
                    obj
                )
            ).toEqual({
                fullName: {
                    given: 'James',
                    family: 'Murrary',
                },
                age: 30,
            });
        });
    });
});
