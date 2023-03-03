import { useEffect, useState } from 'react';

const removeHubspotElement = () => {
    const element = document?.getElementById(
        'hubspot-messages-iframe-container'
    );
    if (element) {
        element.remove();
        return;
    }
    setTimeout(() => {
        'retrying to remove hubspot element...';
        removeHubspotElement();
    }, 2000);
};

export const useRemoveHubspotChatWidget = () => {
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        setAttempts(attempts + 1);
        if (attempts > 10) {
            removeHubspotElement();
        }
    }, [attempts]);
};
