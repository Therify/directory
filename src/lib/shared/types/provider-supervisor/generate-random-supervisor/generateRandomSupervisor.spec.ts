import { generateRandomSupervisor } from './generateRandomSupervisor';
import { isValid } from '../providerSupervisor';

describe('generateRandomSupervisor', () => {
    it('should generate a valid supervisor', () => {
        const supervisor = generateRandomSupervisor();
        expect(isValid(supervisor)).toBe(true);
    });
});
