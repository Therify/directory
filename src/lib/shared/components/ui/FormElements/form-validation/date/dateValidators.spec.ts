import { subYears } from 'date-fns';
import {
    createDateValidationErrorMessages,
    validateDateIsValid,
    validateMaximumDate,
    validateMinimumAge,
    validateMinimumDate,
    DateValidationType,
    getDateValidationErrorMessage,
} from './dateValidators';

describe('Date Validation', function () {
    describe('createDateValidationErrorMessages', function () {
        describe('createNameValidationErrorMessages', () => {
            test('uses error options when provided', () => {
                const options = {
                    fieldName: 'Test',
                    minimumAge: 21,
                    minimimDate: 'October 1, 2020',
                    maximumDate: 'October 1, 2021',
                };
                const errorMessages =
                    createDateValidationErrorMessages(options);
                expect(errorMessages[DateValidationType.Required]).toBe(
                    `${options.fieldName} is required`
                );
                expect(errorMessages[DateValidationType.IsValid]).toBe(
                    `${options.fieldName} is invalid`
                );
                expect(errorMessages[DateValidationType.MinDate]).toBe(
                    `${options.fieldName} is before ${options.minimimDate}`
                );
                expect(errorMessages[DateValidationType.MaxDate]).toBe(
                    `${options.fieldName} is after ${options.maximumDate}`
                );
                expect(errorMessages[DateValidationType.MinAge]).toBe(
                    `Must be at least ${options.minimumAge} years old`
                );
            });

            test('uses default fieldName if not provided', () => {
                const errorMessages = createDateValidationErrorMessages({});
                expect(errorMessages[DateValidationType.Required]).toBe(
                    'Date is required'
                );
                expect(errorMessages[DateValidationType.IsValid]).toBe(
                    'Date is invalid'
                );
                expect(errorMessages[DateValidationType.MinDate]).toBe(
                    'Date is before the minimum date allowed'
                );
                expect(errorMessages[DateValidationType.MaxDate]).toBe(
                    'Date is after the maximum date allowed'
                );
                expect(errorMessages[DateValidationType.MinAge]).toBe(
                    'Must be at least 18 years old'
                );
            });
        });

        test('returning undefined', function () {
            expect(getDateValidationErrorMessage(undefined)).toBe(undefined);
        });
    });

    describe('validateDateIsValid', function () {
        test('returns true when date is valid', function () {
            expect(validateDateIsValid('2020-01-01')).toBe(true);
        });

        test('returns false when date is invalid', function () {
            expect(validateDateIsValid('2020-01-32')).toBe(false);
        });
    });

    describe('validateMinimumDate', function () {
        test('returns true when date is after minimum date', function () {
            expect(
                validateMinimumDate(
                    new Date('2020-01-02'),
                    new Date('2020-01-01')
                )
            ).toBe(true);
        });

        test('returns false when date is before minimum date', function () {
            expect(
                validateMinimumDate(
                    new Date('2020-01-01'),
                    new Date('2020-01-02')
                )
            ).toBe(false);
        });
    });

    describe('validateMaximumDate', function () {
        test('returns true when date is before maximum date', function () {
            expect(
                validateMaximumDate(
                    new Date('2020-01-01'),
                    new Date('2020-01-02')
                )
            ).toBe(true);
        });

        test('returns false when date is after maximum date', function () {
            expect(
                validateMaximumDate(
                    new Date('2020-01-02'),
                    new Date('2020-01-01')
                )
            ).toBe(false);
        });
    });

    describe('validateMinimumAge', function () {
        test('returns true when date is before minimum age', function () {
            expect(validateMinimumAge(subYears(new Date(), 19), 18)).toBe(true);
        });

        test('returns false when date is after minimum age', function () {
            expect(validateMinimumAge(new Date(), 18)).toBe(false);
        });
    });
});
