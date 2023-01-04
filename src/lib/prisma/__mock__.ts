import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from './client';

jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prisma);
});

export const prismaMock = prisma as DeepMockProxy<PrismaClient>;
