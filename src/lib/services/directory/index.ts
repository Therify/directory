import { vendorAuth0 } from '@/lib/vendors/auth0';
import { firebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { vendorStripe } from '@/lib/vendors/stripe';
import { prisma } from '@/lib/prisma';
import { DirectoryServiceParams } from './params';
import { selfAssessmentsFactory } from './self-assessments';

const factoryParams: DirectoryServiceParams = {
    prisma,
    stripe: vendorStripe,
    auth0: vendorAuth0,
    firebaseAdmin: firebaseAdminVendor,
};
export const DirectoryService = {
    selfAssessments: selfAssessmentsFactory(factoryParams),
};

export type DirectoryService = typeof DirectoryService;
