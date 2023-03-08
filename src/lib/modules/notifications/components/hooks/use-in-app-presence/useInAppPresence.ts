import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseVendor } from '@/lib/shared/vendors/firebase';
import { URL_PATHS } from '@/lib/sitemap';

interface InAppPresenceProps {
    userId?: string;
    firebase: FirebaseVendor | null;
    inactivityTimeoutMs?: number;
}

const THIRTY_SECONDS = 30 * 1000;
// These paths generally don't require authentication to access
// Except for logout, which handles its own presence on firebase.signout
const excludedPaths: string[] = [
    URL_PATHS.AUTH.LOGOUT,
    URL_PATHS.ROOT,
    URL_PATHS.PROVIDERS.THERAPIST.REGISTER,
    URL_PATHS.PROVIDERS.THERAPIST.REGISTER_SUCCESS,
    URL_PATHS.PROVIDERS.COACH.REGISTER,
    URL_PATHS.PROVIDERS.COACH.REGISTER_SUCCESS,
    URL_PATHS.MEMBERS.REGISTER,
    URL_PATHS.MEMBERS.REGISTER_SUCCESS,
];

/**
 * Tracks user mouse, tap, and tab focus events to determine inactivity for presence
 * @param userId the signed-in user's id
 * @param firebase Firebase Vendor instance
 * @param inactivityTimeoutMs the number of milliseconds of inactivity before the user is considered offline. Defualts to 30 seconds.
 */
export const useInAppPresence = ({
    userId,
    firebase,
    inactivityTimeoutMs = THIRTY_SECONDS,
}: InAppPresenceProps) => {
    const { pathname } = useRouter();
    const inactivityTimeout = useRef<number>();
    const firebaseAuthPoll = useRef<number>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [localPresence, setLocalPresence] = useState<'online' | 'offline'>(
        'offline'
    );
    const [lastPathname, setLastPathname] = useState<string>('/');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (excludedPaths.includes(pathname)) {
            // We dont want to make calls to firebase here
            window.clearTimeout(inactivityTimeout?.current);
            return;
        }
        if (userId && isAuthenticated && firebase?.isAuthenticated()) {
            const shouldSetOnline =
                localPresence === 'offline' || pathname !== lastPathname;
            const setOnline = () => {
                firebase.setPresence(userId, 'online', pathname);
                setLastPathname(pathname);
                setLocalPresence('online');
            };
            const setOffline = () => {
                firebase.setPresence(userId, 'offline', pathname);
                setLastPathname(pathname);
                setLocalPresence('offline');
            };

            const startInactivityTimeout = () =>
                (inactivityTimeout.current = window.setTimeout(
                    setOffline,
                    inactivityTimeoutMs
                ));

            const resetInactivityTimeout = () => {
                window.clearTimeout(inactivityTimeout?.current);
                startInactivityTimeout();
                if (shouldSetOnline) {
                    setOnline();
                }
            };

            const onWindowFocus = () => {
                resetInactivityTimeout();
                if (shouldSetOnline) {
                    setOnline();
                }
            };
            if (pathname !== lastPathname) {
                setOnline();
            }

            window.addEventListener('mousemove', resetInactivityTimeout, false);
            window.addEventListener('touchmove', resetInactivityTimeout, false);
            window.addEventListener('focus', onWindowFocus);
            startInactivityTimeout();

            return () => {
                window.clearTimeout(inactivityTimeout?.current);
                window.removeEventListener('mousemove', resetInactivityTimeout);
                window.removeEventListener('touchmove', resetInactivityTimeout);
                window.removeEventListener('focus', onWindowFocus);
            };
        }
    }, [
        firebase,
        localPresence,
        userId,
        inactivityTimeoutMs,
        pathname,
        lastPathname,
        isAuthenticated,
    ]);

    useEffect(() => {
        // If not authenticated, and logged in, poll for auth to finish
        if (typeof window === 'undefined') return;
        if (!firebase) return;
        if (firebase?.isAuthenticated()) {
            setIsAuthenticated(true);
            window.clearInterval(firebaseAuthPoll.current);
        } else {
            if (excludedPaths.includes(pathname)) {
                setIsAuthenticated(false);
                return window.clearInterval(firebaseAuthPoll.current);
            }
            firebaseAuthPoll.current = window.setInterval(() => {
                console.log('polling for auth...');
                if (firebase?.isAuthenticated()) {
                    window.clearInterval(firebaseAuthPoll.current);
                    setIsAuthenticated(true);
                    return;
                }
            }, 2000);
        }
        return () => {
            window.clearInterval(firebaseAuthPoll.current);
        };
    }, [firebase, isAuthenticated, pathname]);

    return;
};
