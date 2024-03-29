// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from 'env-var';
import { RedeemedSessionStatus, Role } from '@prisma/client';
import * as z from 'zod';
import { isValid } from 'date-fns';

const redemeedSessionInputSchema = z.object({
    memberId: z.string(),
    profileId: z.string().optional(),
    practiceId: z.string().optional(),
    jotformSubmissionId: z.string(),
    planId: z.string(),
    status: z.enum([
        RedeemedSessionStatus.available,
        RedeemedSessionStatus.voided,
        RedeemedSessionStatus.claimed,
    ]),
    dateOfSession: z.string(),
});

const inputSchema = z.union([
    redemeedSessionInputSchema,
    z.object({
        sessions: z.array(redemeedSessionInputSchema),
    }),
]);

const API_KEY = get('THERIFY_DEV_CREATE_REDEEMED_SESSION').asString();

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
    const input = inputSchema.parse(req.body);
    if ('sessions' in input) {
        const createManyData = input.sessions.map(
            ({ dateOfSession: rawDateOfSession, ...session }) => {
                const dateOfSession = new Date(rawDateOfSession);
                if (!isValid(dateOfSession)) {
                    throw new Error(
                        'Invalid date of session for submission: ' +
                            session.jotformSubmissionId
                    );
                }
                return {
                    ...session,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    dateOfSession,
                };
            }
        );
        const redeemedSessions = await prisma.redeemedSession.createMany({
            data: createManyData,
        });
        return res.status(200).json({
            redeemedSessions,
        });
    }
    const dateOfSession = new Date(input.dateOfSession);
    if (!isValid(dateOfSession)) {
        throw new Error('Invalid date of session');
    }
    const redeemedSession = await prisma.redeemedSession.create({
        data: {
            ...input,
            createdAt: new Date(),
            updatedAt: new Date(),
            dateOfSession,
        },
    });
    return res.status(200).json({
        redeemedSession,
    });
}
