import { Alert } from '@/lib/shared/types';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertToast } from '../AlertToast/AlertToast';

export const AlertManager = ({
    alerts,
    removeAlert,
}: {
    alerts: Alert.Type[];
    removeAlert: (id: string) => void;
}) => {
    return (
        <AnimatePresence>
            {alerts.map((alert) => (
                <motion.div
                    key={alert.id}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        y: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                    }}
                >
                    <AlertToast
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        onClose={() => removeAlert(alert.id)}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
    );
};
const variants = {
    enter: {
        y: -1000,
        opacity: 0,
        maxHeight: 0,
        overflow: 'hidden',
    },
    center: {
        y: 0,
        opacity: 1,
        maxHeight: 1000,
        overflow: 'hidden',
    },
    exit: {
        y: -1000,
        maxHeight: 0,
        opacity: 0,
        overflow: 'hidden',
    },
} as const;
