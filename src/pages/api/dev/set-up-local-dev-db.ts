// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AccountsService } from '@/lib/modules/accounts/service';
import { Role } from '@prisma/client';
import {
    DEVELOPMENT_PRODUCT_IDS,
    Mocks,
    UNITED_STATES,
    Goal,
    AreaOfFocus,
} from '@/lib/shared/types';
import { addYears } from 'date-fns';
import { ProvidersService } from '@/lib/modules/providers/service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (process.env.NODE_ENV !== 'development') {
        return res.status(404).end();
    }
    if (req.method !== 'POST') {
        return res.status(404).end();
    }
    const { emailAddress, password } = req.body;
    const [emailName, emailDomain] = emailAddress?.toString()?.split('@') ?? [];
    if (!emailName || !emailDomain || !password) {
        return res.status(400).end();
    }
    const practiceOwnerEmail = `${emailName}+practice@${emailDomain}`;
    // create practice owner
    const practiceOwnerResult = await AccountsService.registerProvider({
        givenName: 'Jessie',
        surname: 'Wooten',
        emailAddress: practiceOwnerEmail,
        password,
        confirmPassword: password,
        dateOfBirth: new Date('1990-01-01').toISOString(),
        hasAcceptedTermsAndConditions: true,
        role: Role.provider_therapist,
    });
    if (practiceOwnerResult.isErr()) {
        practiceOwnerResult.mapErr((err) => console.error(err));
        return res.status(500).end();
    }
    const practiceOwnerId =
        practiceOwnerResult.value.createTherifyUserEntity.therifyUserId;
    const practiceOwnerStripCustomerId =
        practiceOwnerResult.value.createStripeCustomer.customerId;
    // create practice
    const practiceResult = await AccountsService.handlePracticeOnboarding({
        userId: practiceOwnerId,
        name: 'Local Dev Practice',
        address: '123 Main St',
        city: 'Nashville',
        state: UNITED_STATES.STATE.MAP.NEW_YORK,
        zip: '37211',
        country: UNITED_STATES.COUNTRY.CODE,
        email: `${emailName}@${emailDomain}`,
        billingCycle: 'year',
        seatCount: 5,
    });
    if (practiceResult.isErr()) {
        practiceResult.mapErr((err) => console.error(err));
        return res.status(500).end();
    }
    const practiceId = practiceResult.value.handlePracticeEntity.practiceId;
    //Create Plan
    const planResult =
        await AccountsService.billing.handleGroupPracticePlanPayment({
            startDate: new Date().toISOString(),
            endDate: addYears(new Date(), 1).toISOString(),
            stripeSubscriptionId: 'test-subscription-id',
            stripeCustomerId: practiceOwnerStripCustomerId,
            seats: 5,
            invoiceId: 'Test Invoice Id',
            invoiceTotal: 100,
            invoiceAmountDue: 100,
            invoiceAmountPaid: 100,
            invoiceAmountRemaining: 0,
            invoiceStatus: 'paid',
            priceId: DEVELOPMENT_PRODUCT_IDS.group_practice_plan.PRICES.ANNUAL,
        });
    if (planResult.isErr()) {
        planResult.mapErr((err) => console.error(err));
        return res.status(500).end();
    }

    // create profile
    const { id, ...profile } = Mocks.getMockProviderProfile();
    const profileResult =
        await ProvidersService.profiles.createProfileForPractice({
            profile: {
                ...profile,
                specialties: [
                    AreaOfFocus.MAP.DEPRESSION,
                    AreaOfFocus.MAP.ANXIETY,
                    AreaOfFocus.MAP.STRESS,
                ],
            },
            userId: practiceOwnerId,
        });

    if (profileResult.isErr()) {
        profileResult.mapErr((err) => console.error(err));
        return res.status(500).end();
    }

    // create an account
    const account = await prisma.account.create({
        data: {
            name: 'Local Dev Members',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    const registrationCode = await prisma.registrationCode.create({
        data: {
            id: 'local-dev',
            accountId: account.id,
        },
    });
    const memberPlan = await prisma.plan.create({
        data: {
            seats: 10,
            startDate: new Date().toISOString(),
            endDate: addYears(new Date(), 1).toISOString(),
            accountId: account.id,
            status: 'active',
            renews: false,
            coveredSessions: 6,
        },
    });
    const memberEmail = `${emailName}+member@${emailDomain}`;
    const memberResult = await AccountsService.registerMember({
        emailAddress: memberEmail,
        registrationCode: registrationCode.id,
        givenName: 'James',
        surname: 'Memberson',
        country: UNITED_STATES.COUNTRY.CODE,
        state: UNITED_STATES.STATE.MAP.NEW_YORK,
        role: Role.member,
        password,
        confirmPassword: password,
        dateOfBirth: new Date('1990-01-01').toISOString(),
        hasAcceptedTermsAndConditions: true,
        concerns: [AreaOfFocus.MAP.DEPRESSION],
        insurance: 'Aetna',
        goals: [Goal.ENTRIES[0]],
    });
    if (!memberResult) {
        console.error('Member register failed');
        return res.status(500).end();
    }
    res.status(200).json({
        registrationCode: registrationCode.id,
        practiceOwnerEmail,
        memberEmail,
    });
}
