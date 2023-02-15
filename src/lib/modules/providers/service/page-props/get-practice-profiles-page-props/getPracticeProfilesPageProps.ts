import { ProviderProfileListing } from '@/lib/shared/types';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { AccountsService } from '@/lib/modules/accounts/service';
import { profilesFactory } from '@/lib/modules/providers/service/profiles';
import { ProvidersServiceParams } from '../../params';
import { practiceFactory } from '../../practice';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';

export interface PracticeProfilesPageProps {
    profiles: ProviderProfileListing.Type[];
    practice: { id: string; name: string };
    user: TherifyUser.TherifyUser;
}

interface PracticeProfilesPagePropsParams extends ProvidersServiceParams {
    accountsService: AccountsService;
}

export const factory = (params: PracticeProfilesPagePropsParams) => {
    const getPracticeProfilesPageProps: GetServerSideProps<
        PracticeProfilesPageProps
    > = async (context) => {
        console.log('gettting PracticeProfilesPageProps...');
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const getUserDetails = GetProviderTherifyUser.factory(params);
        const { listPracticeProfilesByUserId } = profilesFactory(params);
        const { getPracticeByUserId } = practiceFactory(params);

        const [{ user }, { profiles }, { practice }] = await Promise.all([
            getUserDetails({ userId: session.user.sub }),
            listPracticeProfilesByUserId({ userId: session.user.sub }),
            getPracticeByUserId({ userId: session.user.sub }),
        ]);
        if (user === null) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const props: PracticeProfilesPageProps = {
            profiles,
            practice,
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getPracticeProfilesPageProps;
};
