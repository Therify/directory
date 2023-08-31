import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Meta, type StoryFn } from '@storybook/react';
import { MemberRegistrationFlow as Component } from './MemberRegistrationFlow';
import { ROLES } from '@/lib/shared/types';

const meta: Meta<typeof Component> = {
    title: 'V3/Registration/MemberRegistrationFlow',
    component: Component,
};

export default meta;

export const Registration: StoryFn<typeof Component> = (args) => {
    return (
        <Component
            registerMember={console.log}
            clearErrorMessage={() => {}}
            isRegisteringMember={false}
            emailValidationUrl=""
            isRegistrationComplete={false}
            role={ROLES.MEMBER}
            hasSeatsAvailable
            showInsurances
        />
    );
};
