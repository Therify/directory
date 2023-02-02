import { ProviderProfile } from '@/components/features/directory/ProviderProfile';
import { TopBar, TopNavigationLayout } from '@/components/ui';

export default function ProviderProfilePage() {
    return (
        <TopNavigationLayout navigationSlot={<TopBar />}>
            <ProviderProfile />
        </TopNavigationLayout>
    );
}
