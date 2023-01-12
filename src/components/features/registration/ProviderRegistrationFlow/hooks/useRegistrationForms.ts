import { useForm } from 'react-hook-form';
import { RegisterProvider } from '@/lib/features/registration';

interface ProviderRegistrationFormProps {
    defaultProviderDetails?: Partial<RegisterProvider.Input['providerDetails']>;
    defaultNumberOfSeats?: Partial<RegisterProvider.Input['numberOfSeats']>;
}

export const useRegistrationForms = (
    options?: ProviderRegistrationFormProps
) => {
    const { defaultProviderDetails, defaultNumberOfSeats } = options ?? {};

    const providerDetailsForm = useForm<
        RegisterProvider.Input['providerDetails']
    >({
        mode: 'onChange',
        defaultValues: defaultProviderDetails,
    });

    const numberOfSeatsForm = useForm<{
        numberOfSeats: RegisterProvider.Input['numberOfSeats'];
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
