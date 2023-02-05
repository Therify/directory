import { ProviderProfile } from '@/components/features/directory/ProviderProfile';
import { TopBar, TopNavigationLayout } from '@/components/ui';
import { prisma } from '@/lib/prisma';
import { ProviderProfile as IProviderProfile } from '@prisma/client';
import { GetServerSideProps } from 'next';

export default function ProviderProfilePage({
    results,
}: {
    results: IProviderProfile;
}) {
    console.log(results);
    return (
        <TopNavigationLayout navigationSlot={<TopBar />}>
            <ProviderProfile {...results} />
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
            results: JSON.parse(JSON.stringify(results)),
        },
    };
};
