import { prisma } from '@/lib/prisma';
import { validate as validateSelfAssessment } from '../selfAssessment';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export async function isAtRisk(
    context: GetServerSidePropsContext
): Promise<boolean> {
    const { getSession } = await import('@auth0/nextjs-auth0');
    const session = await getSession(context.req, context.res);
    if (!session) return false;
    const rawSelfAssessment = await prisma.selfAssessment.findFirst({
        where: {
            userId: session.user.sub,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 1,
    });
    console.log('rawSelfAssessment', rawSelfAssessment);
    if (!rawSelfAssessment) return false;
    try {
        const selfAssessment = validateSelfAssessment(rawSelfAssessment);
        console.log('selfAssessment', selfAssessment);
        const isAtRisk =
            selfAssessment.isInCrisis ||
            selfAssessment.hasSuicidalIdeation ||
            selfAssessment.phq9Score >= 10;
        console.log('isAtRisk', isAtRisk);
        return isAtRisk;
    } catch {
        return false;
    }
}

export function middleware<T extends Record<string, unknown>>(
    callback: GetServerSideProps<T>
) {
    return async (context: GetServerSidePropsContext) => {
        const isMemberAtRisk = await isAtRisk(context);
        console.log('isMemberAtRisk', isMemberAtRisk);
        if (isMemberAtRisk) {
            return {
                redirect: {
                    destination: '/members/request-appointment',
                    permanent: false,
                },
            };
        }
        return callback(context);
    };
}
