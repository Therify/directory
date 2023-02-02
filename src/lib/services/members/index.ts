import { vendorAuth0 } from '@/lib/vendors/auth0';
import { firebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { vendorStripe } from '@/lib/vendors/stripe';
import { prisma } from '@/lib/prisma';
import { MembersServiceParams } from './params';
import { selfAssessmentsFactory } from './self-assessments';

const factoryParams: MembersServiceParams = {
    prisma,
    stripe: vendorStripe,
    auth0: vendorAuth0,
    firebaseAdmin: firebaseAdminVendor,
};
export const MembersService = {
    selfAssessments: selfAssessmentsFactory(factoryParams),
};

export type MembersService = typeof MembersService;
