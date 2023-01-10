import { AnimatePresence, motion } from 'framer-motion';

import { WizardChildProps } from './types';

export function WizardStep({
    children,
    doRender = false,
}: WizardChildProps & { doRender?: boolean }) {
    return (
        <AnimatePresence>
            {doRender && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
