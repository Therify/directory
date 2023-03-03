import { useEffect, useState } from 'react';

let attempts = 0;

const removeHubspotElement = () => {
    attempts += 1;
    const element = document?.getElementById(
        'hubspot-messages-iframe-container'
    );
    if (element) {
        element.remove();
        return;
    }
    if (attempts < 10) {
        setTimeout(() => {
            console.log('retrying to remove hubspot element...');
            removeHubspotElement();
        }, 2000);
    }
};

export const useRemoveHubspotChatWidget = () => {
    useEffect(removeHubspotElement, []);
};
