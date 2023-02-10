import { ProviderProfile as ProviderProfileUi } from '@/lib/modules/directory/components/ProviderProfile';
import { TopBar, TopNavigationLayout } from '@/lib/shared/components/ui';
import { prisma } from '@/lib/prisma';
import { ProviderProfile } from '@/lib/shared/types';
import { GetServerSideProps } from 'next';

export default function ProviderProfilePage({
    profile,
}: {
    profile: ProviderProfile.ProviderProfile;
}) {
    console.log(profile);
    return (
        <TopNavigationLayout navigationSlot={<TopBar />}>
            <ProviderProfileUi {...profile} />
        </TopNavigationLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { profileId } = context.query;
    const results = await prisma.providerProfile.findFirst({
        where: {
            id: profileId as string,
        },
    });

    return {
        props: {
            profile: JSON.parse(
                JSON.stringify(ProviderProfile.validate(results))
            ),
        },
    };
};
