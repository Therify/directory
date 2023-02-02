import { firebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { prisma } from '@/lib/prisma';
import { MembersServiceParams } from './params';
import { selfAssessmentsFactory } from './self-assessments';

const factoryParams: MembersServiceParams = {
    prisma,
    firebaseAdmin: firebaseAdminVendor,
};
export const MembersService = {
    selfAssessments: selfAssessmentsFactory(factoryParams),
};

export type MembersService = typeof MembersService;
