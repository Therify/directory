import { mapObject } from '@/lib/shared/utils';
import { prisma } from '@/lib/prisma';
import { VendorInngest } from './inngest';

export default VendorInngest.createFunction(
    'therify-directory-process-application',
    'directory.process-application',
    async function ({ event }) {
        const profile = mapObject(
            {
                givenName: 'answers.name.first',
                surname: 'answers.name.last',
                contactEmail: 'answers.emailAddress',
                bio: 'answers.bio',
                // @ts-ignore
                designation: [
                    'answers.designation',
                    (answer: string) => answer.toLowerCase(),
                ],
                // @ts-ignore
                offersSlidingScale: [
                    'answers.offersSlidingScale',
                    (answer: string) => answer === 'Yes',
                ],
                npiNumber: 'answers.npiNumber',
                // @ts-ignore
                minimumRate: ['answers.hourlyRate', parseFloat],
                idealClientDescription: 'answers.idealClientDescription',
                gender: 'answers.gender',
                // @ts-ignore
                specialties: [
                    'answers.specialties',
                    (answer) => {
                        if (Array.isArray(answer)) {
                            return answer;
                        }
                        return Object.values(answer);
                    },
                ],
                // @ts-ignore
                ethnicity: [
                    'answers.ethnicity',
                    (answer) => {
                        if (Array.isArray(answer)) {
                            return answer;
                        }
                        return Object.values(answer);
                    },
                ],
                // @ts-ignore
                communitiesServed: [
                    'answers.communitiesServed',
                    (answer) => {
                        if (Array.isArray(answer)) {
                            return answer;
                        }
                        return Object.values(answer);
                    },
                ],
                // @ts-ignore
                pronouns: [
                    'answers.pronouns',
                    (answer: string) => answer.toLowerCase(),
                ],
                ageGroups: 'answers.ageGroups',
                // @ts-ignore
                offersInPerson: [
                    'answers.offersInPerson',
                    (answer: string) => answer === 'Yes',
                ],
                // @ts-ignore
                offersPhoneConsultations: [
                    'answers.offersPhoneConsultation',
                    (answer: string) => answer === 'Yes',
                ],
            },
            event.data
        );
        await prisma.providerProfile.create({
            data: {
                // @ts-ignore
                ...profile,
            },
        });
        return {
            profile,
        };
    }
);
