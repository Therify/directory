import { factory as getProviderProfileByUserIdFactory } from './getProfileByUserId';
import { prismaMock } from '@/lib/prisma/__mock__';
import { NewClientStatus, ProfileType, Role, User } from '@prisma/client';
import { generateMock } from '@anatine/zod-mock';
import { ProvidersServiceParams } from '../../params';
import { ProviderProfile } from '@/lib/shared/types';

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
    } as ProviderProfile.ProviderProfile,
} as unknown as User & { providerProfile: ProviderProfile.ProviderProfile };

describe('getProfileByUserId', () => {
    it('should return a provider profile', async () => {
        const getProviderProfileByUserId = getProviderProfileByUserIdFactory({
            prisma: prismaMock,
        } as unknown as ProvidersServiceParams);
        const mockProfile: ProviderProfile.ProviderProfile = {
            ...generateMock(ProviderProfile.schema),
            designation: ProfileType.therapist,
            newClientStatus: NewClientStatus.accepting,
        };
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            ...mockUserResult,
            providerProfile: mockProfile,
        } as unknown as User & { providerProfile: ProviderProfile.ProviderProfile });
        const result = await getProviderProfileByUserId({
            userId: mockUserResult.id,
        });
        await expect(result).toEqual({
            profile: mockProfile,
        });
    });

    it('should throw when user not provider', async () => {
        const getProviderProfileByUserId = getProviderProfileByUserIdFactory({
            prisma: prismaMock,
        } as unknown as ProvidersServiceParams);
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
        } as unknown as ProvidersServiceParams);
        prismaMock.user.findUniqueOrThrow.mockResolvedValue({
            ...mockUserResult,
            providerProfile: null,
        } as unknown as User & { providerProfile: ProviderProfile.ProviderProfile });
        const result = await getProviderProfileByUserId({
            userId: mockUserResult.id,
        });
        await expect(result).toEqual({
            profile: null,
        });
    });
});
