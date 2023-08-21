import { useEffect, useState } from 'react';

export const useIsMobileDevice = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (
            window.navigator.userAgent.match(/Android/i) ||
            window.navigator.userAgent.match(/webOS/i) ||
            window.navigator.userAgent.match(/iPhone/i) ||
            window.navigator.userAgent.match(/iPad/i) ||
            window.navigator.userAgent.match(/iPod/i) ||
            window.navigator.userAgent.match(/BlackBerry/i) ||
            window.navigator.userAgent.match(/Windows Phone/i)
        ) {
            setIsMobileDevice(true);
            return;
        }
        setIsMobileDevice(false);
    }, []);
    return isMobileDevice;
};
