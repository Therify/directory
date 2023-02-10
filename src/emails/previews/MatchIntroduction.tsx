import React from 'react';
import MatchIntroduction from '../MatchIntroduction';

export function withCoveredSession() {
    return (
        <MatchIntroduction
            member={{
                givenName: 'John',
                emailAddress: 'john@example.com',
                state: 'California',
            }}
            provider={{
                giveName: 'Jane',
            }}
            plan={{
                numberOfCoveredSessions: 5,
            }}
        />
    );
}
