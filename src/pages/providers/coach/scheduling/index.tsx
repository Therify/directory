import { ProvidersService } from '@/lib/modules/providers/service';
import { useNylas } from '@nylas/nylas-react';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { RBAC } from '@/lib/shared/utils/rbac';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useFeatureFlags } from '@/lib/shared/hooks';
import { TherifyUser } from '@/lib/shared/types';
import { useState, useEffect } from 'react';
import { addDays, getDate } from 'date-fns';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function SchedulingPage({
    user,
}: {
    user: TherifyUser.TherifyUser;
}) {
    const { flags } = useFeatureFlags(user);
    // const nylas = useNylas();
    const [primaryCalendar, setPrimaryCalendar] = useState<string | null>(null);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const serverBaseUrl = 'http://localhost:3000';

    // useEffect(() => {
    //     if (!nylas) {
    //         return;
    //     }

    //     // Handle the code that is passed in the query params from Nylas after a successful login
    //     const params = new URLSearchParams(window.location.search);
    //     if (params.has('code')) {
    //         nylas
    //             .exchangeCodeFromUrlForToken()
    //             .then((user) => {
    //                 const { id } = JSON.parse(user);
    //                 setUserId(id);
    //                 sessionStorage.setItem('userId', id);
    //             })
    //             .catch((error) => {
    //                 console.error(
    //                     'An error occurred parsing the response:',
    //                     error
    //                 );
    //             });
    //     }
    // }, [nylas]);

    useEffect(() => {
        const userIdString = sessionStorage.getItem('userId');
        const userEmail = sessionStorage.getItem('userEmail');
        if (userIdString) {
            setUserId(userIdString);
        }
        if (userEmail) {
            setUserEmail(userEmail);
        }
        if (userIdString) {
            setUserId(userIdString);
        }
    }, []);

    useEffect(() => {
        if (userId?.length) {
            window.history.replaceState({}, '', `/?userId=${userId}`);
            getPrimaryCalendarEvents();
        } else {
            window.history.replaceState({}, '', '/');
        }
    }, [userId]);

    if (!user) {
        return <div>Chat is not available</div>;
    }
    const getPrimaryCalendar = async () => {
        try {
            const url = serverBaseUrl + '/nylas/read-calendars';

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: userId,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            let [calendar] = data.filter(
                (calendar: any) => calendar.is_primary
            );
            // if no primary calendar, use the first one
            if (!calendar && data.length) {
                calendar = data[0];
            }

            setPrimaryCalendar(calendar);
            return calendar;
        } catch (err) {
            console.warn(`Error reading calendars:`, err);
        }
    };

    const getCalendarEvents = async (calendarId: string) => {
        if (calendarId) {
            try {
                const startsAfter = getDate(new Date()); // today
                const endsBefore = addDays(startsAfter, 7); // 7 days from today

                const queryParams = new URLSearchParams({
                    limit: '50',
                    startsAfter: new Date(startsAfter).toISOString(),
                    endsBefore: new Date(endsBefore).toISOString(),
                    calendarId,
                });

                const url = `${serverBaseUrl}/nylas/read-events?${queryParams.toString()}`;

                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: userId,
                        'Content-Type': 'application/json',
                    },
                    // params: {
                    //     calendarId,
                    // },
                });

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = (await res.json()).filter(
                    (event: any) => event.status !== 'cancelled'
                );

                setEvents(data);
                setIsLoading(false);
            } catch (err) {
                console.warn(`Error reading calendar events:`, err);
            }
        }
    };

    const getPrimaryCalendarEvents = async () => {
        setIsLoading(true);
        const primaryCalendar = await getPrimaryCalendar();
        await getCalendarEvents(primaryCalendar?.id);
        setIsLoading(false);
    };

    const disconnectUser = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userEmail');
        setUserId('');
        setUserEmail('');
    };

    const refresh = () => {
        getPrimaryCalendarEvents();
    };

    return (
        <ProviderNavigationPage
            currentPath="/providers/coach/scheduling"
            user={user}
        >
            {/* <Layout
            showMenu={!!userId}
            disconnectUser={disconnectUser}
            isLoading={isLoading}
            refresh={refresh}
        > */}
            {!userId ? (
                <NylasLogin email={userEmail} setEmail={setUserEmail} />
            ) : (
                <div className="app-card">
                    {/* <CalendarApp
                        userId={userId}
                        calendarId={primaryCalendar?.id}
                        serverBaseUrl={serverBaseUrl}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        events={events}
                        refresh={refresh}
                    /> */}
                </div>
            )}
            {/* </Layout> */}
        </ProviderNavigationPage>
    );
}

const NylasLogin = ({
    email,
    setEmail,
}: {
    email: string;
    setEmail: (email: string) => void;
}) => {
    // const nylas = useNylas();

    const [isLoading, setIsLoading] = useState(false);

    const loginUser = (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        sessionStorage.setItem('userEmail', email);

        // nylas.authWithRedirect({
        //     emailAddress: email,
        //     successRedirectUrl: '',
        // });
    };

    return (
        <section className="login">
            <form onSubmit={loginUser}>
                <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Connecting...' : 'Connect email'}
                </button>
            </form>
        </section>
    );
};
