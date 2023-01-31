import { factory as getProviderProfileByUserIdFactory } from './getProviderProfileByUserId';
import { prismaMock } from '@/lib/prisma/__mock__';
import { ProviderProfile, Role, User } from '@prisma/client';
import { AccountsServiceParams } from '../params';

const mockUserResult = {
    id: 'test-user-id',
    emailAddress: 'test@therify.co',
    roles: [Role.provider_therapist],
    accountId: 'test',
    givenName: 'Test',
    surname: 'Jackson',
    createdAt: new Date('2021-03-01'),
    providerProfile: {
        id: 'test-provider-id',
    } as ProviderProfile,
} as unknown as User & { providerProfile: ProviderProfile };

describe('getProviderProfileByUserId', () => {
    it('should return a provider profile', async () => {
        const getProviderProfileByUserId = getProviderProfileByUserIdFactory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUserResult);
        const result = await getProviderProfileByUserId({
            userId: mockUserResult.id,
        });
        await expect(result).toEqual({
            profile: mockUserResult.providerProfile,
        });
    });

    it('should throw when user not provider', async () => {
        const getProviderProfileByUserId = getProviderProfileByUserIdFactory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            ...mockUserResult,
            roles: [Role.member],
        });
        await expect(
            getProviderProfileByUserId({
                userId: mockUserResult.id,
            })
        ).rejects.toThrowError('User is not a provider.');
    });

    it('should return null when no profile', async () => {
        const getProviderProfileByUserId = getProviderProfileByUserIdFactory({
            prisma: prismaMock,
        } as unknown as AccountsServiceParams);
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            ...mockUserResult,
            providerProfile: null,
        } as unknown as User & { providerProfile: ProviderProfile });
        const result = await getProviderProfileByUserId({
            userId: mockUserResult.id,
        });
        await expect(result).toEqual({
            profile: null,
        });
    });
});
