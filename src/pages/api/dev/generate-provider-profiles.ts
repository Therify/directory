import { prisma } from '@/lib/prisma';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (process.env.NODE_ENV === 'production') return res.status(404).end();
    if (req.method !== 'POST') return res.status(404).end();
    const { practiceId, profiles = null } = req.body;
    if (!practiceId) return res.status(400).end('Missing practiceId');
    const practice = await prisma.practice.findUnique({
        where: {
            id: practiceId,
        },
        select: {
            plans: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
            practiceProfile: true,
        },
    });
    if (!practice) return res.status(404).end('Practice not found');
    const remainingProfileSeats =
        practice?.plans[0].seats ?? 0 - practice?.practiceProfile.length;
    if (remainingProfileSeats <= 0)
        return res.status(400).end('No remaining profile seats');
    const profilesToCreate = Array.from({ length: remainingProfileSeats }, () =>
        generateRandomProfile()
    );
    const createdProfiles = await Promise.all(
        profilesToCreate.map((profile) => {
            return prisma.providerProfile.create({
                // @ts-ignore
                data: profile,
            });
        })
    );
    await Promise.all(
        createdProfiles.map((profile) => {
            return prisma.practiceProfile.create({
                data: {
                    practiceId,
                    profileId: profile.id,
                },
            });
        })
    );
    await Promise.all(
        createdProfiles.map((profile) => {
            return prisma.directoryListing.create({
                data: {
                    practiceId,
                    providerProfileId: profile.id,
                    status: 'listed',
                },
            });
        })
    );
    return res.status(200).json(createdProfiles);
}
