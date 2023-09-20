import { type Meta, type StoryFn } from '@storybook/react';
import { MemberRegistrationForm as Component } from './MemberRegistrationForm';
import { ROLES } from '@/lib/shared/types';
import { useState } from 'react';
import { Account } from '@prisma/client';

const meta: Meta<typeof Component> = {
    title: 'V3/Registration/MemberRegistrationForm',
    component: Component,
};

export default meta;

export const Registration: StoryFn<typeof Component> = (args) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const submit = (form: any) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsDone(true);
            alert(JSON.stringify(form));
        }, 1500);
    };
    return (
        <Component
            registerMember={submit}
            clearErrorMessage={() => {}}
            isRegisteringMember={isLoading}
            isRegistrationComplete={isDone}
            role={ROLES.MEMBER}
            hasSeatsAvailable
        />
    );
};
export const WithError: StoryFn<typeof Component> = (args) => {
    const errorMessage = 'An error occurred.';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(errorMessage);
    const submit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setError(errorMessage);
        }, 1500);
    };
    return (
        <Component
            registerMember={submit}
            clearErrorMessage={() => {
                setError(undefined);
            }}
            isRegisteringMember={isLoading}
            isRegistrationComplete={false}
            role={ROLES.MEMBER}
            hasSeatsAvailable
            errorMessage={error}
        />
    );
};
export const NoSeatsAvailable: StoryFn<typeof Component> = (args) => {
    const submit = () => {};
    return (
        <Component
            registerMember={submit}
            clearErrorMessage={() => {}}
            isRegisteringMember={false}
            isRegistrationComplete={false}
            account={
                {
                    name: 'Test Account',
                } as Account
            }
            role={ROLES.MEMBER}
            hasSeatsAvailable={false}
        />
    );
};

export const CurrentlyRegistering: StoryFn<typeof Component> = (args) => {
    const submit = () => {};
    return (
        <Component
            registerMember={submit}
            clearErrorMessage={() => {}}
            isRegisteringMember
            isRegistrationComplete={false}
            role={ROLES.MEMBER}
            hasSeatsAvailable
        />
    );
};
