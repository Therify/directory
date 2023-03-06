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

// Tracks user activity and marks them `offline` after specified time of activity.
// Default inactivity timer expires after 30 seconds
export const useInAppPresence = ({
    userId,
    firebase,
    inactivityTimeoutMs = THIRTY_SECONDS,
}: InAppPresenceProps) => {
    const { pathname } = useRouter();
    const windowBlurTimeout = useRef<number>();
    const inactivityTimeout = useRef<number>();
    const [localPresence, setLocalPresence] = useState<'online' | 'offline'>(
        'offline'
    );
    const [lastPathname, setLastPathname] = useState<string>(pathname);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (pathname === URL_PATHS.AUTH.LOGOUT) {
            // Signout will clean up presence.
            // We dont want to make calls to firebase or we will get permission denied errors when the session ends from signout
            window.clearTimeout(windowBlurTimeout?.current);
            return;
        }
        if (userId && firebase?.isAuthenticated()) {
            const startInactivityTimeout = () =>
                (inactivityTimeout.current = window.setTimeout(() => {
                    firebase.setPresence(userId, 'offline', pathname);
                    setLastPathname(pathname);
                    setLocalPresence('offline');
                }, inactivityTimeoutMs));

            const resetInactivityTimeout = () => {
                window.clearTimeout(inactivityTimeout?.current);
                startInactivityTimeout();
                if (localPresence === 'offline' || pathname !== lastPathname) {
                    firebase.setPresence(userId, 'online', pathname);
                    setLastPathname(pathname);
                    setLocalPresence('online');
                }
            };

            const onWindowFocus = () => {
                window.clearTimeout(windowBlurTimeout?.current);
                if (localPresence === 'offline' || pathname !== lastPathname) {
                    firebase.setPresence(userId, 'online', pathname);
                    setLastPathname(pathname);
                    setLocalPresence('online');
                }
            };
            if (pathname !== lastPathname) {
                firebase.setPresence(userId, 'online', pathname);
                setLastPathname(pathname);
                setLocalPresence('online');
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
    ]);

    return;
};
