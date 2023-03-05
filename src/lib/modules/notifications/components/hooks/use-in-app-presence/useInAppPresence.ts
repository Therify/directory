import { useEffect, useRef, useState } from 'react';
import { FirebaseVendor } from '@/lib/shared/vendors/firebase';

interface InAppPresenceProps {
    userId?: string;
    firebase: FirebaseVendor | null;
    inactivityTimeoutMs?: number;
}

const THIRTY_SECONDS = 30 * 1000;

// Tracks user presence in the app and marks them `offline`.
// Default inactivity occurs after 30 seconds
export const useInAppPresence = ({
    userId,
    firebase,
    inactivityTimeoutMs,
}: InAppPresenceProps) => {
    const windowBlurTimeout = useRef<number>();
    const inactivityTimeout = useRef<number>();
    const [localPresence, setLocalPresence] = useState<'online' | 'offline'>(
        'offline'
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (userId && firebase?.isAuthenticated()) {
            const startInactivityTimeout = () =>
                (inactivityTimeout.current = window.setTimeout(() => {
                    if (localPresence === 'online') {
                        firebase.setPresence(userId, 'offline');
                        setLocalPresence('offline');
                    }
                }, inactivityTimeoutMs ?? THIRTY_SECONDS));

            const resetInactivityTimeout = () => {
                window.clearTimeout(inactivityTimeout?.current);
                startInactivityTimeout();
                if (localPresence === 'offline') {
                    firebase.setPresence(userId, 'online');
                    setLocalPresence('online');
                }
            };

            const onWindowFocus = () => {
                window.clearTimeout(windowBlurTimeout?.current);
                if (localPresence === 'offline') {
                    firebase.setPresence(userId, 'online');
                    setLocalPresence('online');
                }
            };
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
    }, [firebase, localPresence, userId, inactivityTimeoutMs]);

    return;
};
