import { generateRandomProfile } from '../generate-random-profile/generateRandomProfile';
import { renderDesignation } from './renderDesignation';

describe('renderDesignation', () => {
    it('should render the designation of the provider in human readable format', () => {
        const providerProfile = generateRandomProfile({
            designation: 'coach',
        });
        const result = renderDesignation(providerProfile);
        expect(result).toBe('Mental Health Coach');
    });
});
