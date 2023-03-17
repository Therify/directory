// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UNITED_STATES } from '@/lib/shared/types';
import { get } from 'env-var';

const API_KEY = get('ADD_COUNTRY_TO_PROVIDER_PROFILES_KEY').asString();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== 'POST' || API_KEY === undefined) {
        return res.status(404).end();
    }
    if (req.headers.api_key !== API_KEY) {
        console.log('Invalid API key', { key: req.headers.api_key });
        return res.status(400).end();
    }
    const allProfiles = await prisma.providerProfile.findMany();
    const updates = await Promise.allSettled(
        allProfiles.map(async (profile) => {
            let supervisor, credentials, acceptedInsurances;
            const {
                supervisor: rawSupervisor,
                credentials: rawCredentials,
                acceptedInsurances: rawAcceptedInsurances,
            } = profile;
            if (!!rawSupervisor && JSON.stringify(rawSupervisor) !== '{}') {
                const jsonSupervisor = JSON.parse(
                    JSON.stringify(rawSupervisor)
                );
                supervisor = {
                    ...jsonSupervisor,
                    supervisorLicense: {
                        ...jsonSupervisor.supervisorLicense,
                        country: UNITED_STATES.COUNTRY.CODE,
                    },
                };
            }

            if (
                !!rawCredentials &&
                Array.isArray(rawCredentials) &&
                rawCredentials.length > 0
            ) {
                credentials = rawCredentials.map((credential) => ({
                    ...JSON.parse(JSON.stringify(credential)),
                    country: UNITED_STATES.COUNTRY.CODE,
                }));
            }

            if (
                !!rawAcceptedInsurances &&
                Array.isArray(rawAcceptedInsurances) &&
                rawAcceptedInsurances.length > 0
            ) {
                acceptedInsurances = rawAcceptedInsurances.map((insurance) => ({
                    ...JSON.parse(JSON.stringify(insurance)),
                    country: UNITED_STATES.COUNTRY.CODE,
                }));
            }
            if (!!supervisor || !!credentials || !acceptedInsurances) {
                return prisma.providerProfile.update({
                    where: {
                        id: profile.id,
                    },
                    data: {
                        ...(supervisor ? { supervisor } : {}),
                        ...(credentials ? { credentials } : {}),
                        ...(acceptedInsurances ? { acceptedInsurances } : {}),
                    },
                });
            }
        })
    );
    const fulfilled = updates.filter(
        (update) => update.status === 'fulfilled'
    ).length;
    const rejected = updates.filter(
        (update) => update.status !== 'fulfilled'
    ).length;
    return res.status(200).json({
        total: allProfiles.length,
        fulfilled,
        rejected,
    });
}
