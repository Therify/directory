import { useForm } from 'react-hook-form';
import { RegisterProvider } from '@/lib/features/registration';

interface ProviderRegistrationFormProps {
    defaultProviderDetails?: Partial<RegisterProvider.Input>;
    defaultNumberOfSeats?: number;
}

export const useRegistrationForms = (
    options?: ProviderRegistrationFormProps
) => {
    const { defaultProviderDetails, defaultNumberOfSeats } = options ?? {};

    const providerDetailsForm = useForm<RegisterProvider.Input>({
        mode: 'onChange',
        defaultValues: defaultProviderDetails,
    });

    const numberOfSeatsForm = useForm<{
        numberOfSeats: number;
    }>({
        mode: 'onChange',
        defaultValues: {
            numberOfSeats: defaultNumberOfSeats,
        },
    });

    return {
        providerDetailsForm,
        numberOfSeatsForm,
    };
};
