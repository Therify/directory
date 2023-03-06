import { CenteredContainer, TherifyIcon } from '@/lib/shared/components/ui';
import { FirebaseClient } from '@/lib/shared/context';
import { URL_PATHS } from '@/lib/sitemap';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useContext, useEffect } from 'react';

export default function Logout() {
    const router = useRouter();
    const theme = useTheme();
    const { firebase } = useContext(FirebaseClient.Context);
    useEffect(() => {
        destroyCookie(null, 'userRoles');
        firebase?.signOut();
        router.push(URL_PATHS.API.AUTH.LOGOUT);
    }, [firebase, router]);

    return (
        <CenteredContainer
            fillSpace
            style={{ background: theme.palette.background.default }}
        >
            <motion.div
                animate={{ rotate: [0, 360, 360], scale: [1, 1.3, 1] }}
                transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0.5,
                }}
            >
                <TherifyIcon width="50px" />
            </motion.div>
        </CenteredContainer>
    );
}
