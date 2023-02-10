import { useRouter } from 'next/router';
import { ProviderRegistrationSuccess } from '@/lib/modules/registration/components';

export default function RegistrationSuccessPage() {
    const router = useRouter();
    const { email: rawEmail, user_id: rawUserId } = router.query;
    const email: string | undefined = Array.isArray(rawEmail)
        ? rawEmail.join('')
        : rawEmail;
    const userId: string | undefined = Array.isArray(rawUserId)
        ? rawUserId.join('')
        : rawUserId;

    return <ProviderRegistrationSuccess email={email} userId={userId} />;
}
