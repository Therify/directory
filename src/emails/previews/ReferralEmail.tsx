import React from 'react';
import ReferralEmail from '../ReferralEmail';

export function withCoveredSession() {
    return (
        <ReferralEmail
            member={{
                givenName: 'John',
                surname: 'Doe',
                emailAddress: 'john@example.com',
                state: 'California',
                concerns: ['Depression', 'Anxiety'],
                insurance: 'Blue Cross Blue Shield',
            }}
            provider={{
                givenName: 'Jane',
            }}
            plan={{
                numberOfCoveredSessions: 5,
                planName: 'Gold',
            }}
        />
    );
}
