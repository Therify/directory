import { PrismaClient, Role } from '@prisma/client';

export const getMemberId = async (
    memberEmail: string | undefined,
    prisma: PrismaClient
): Promise<{ memberId: string }> => {
    if (!memberEmail) throw new Error('[getMember]: No member email provided');
    const member = await prisma.user.findFirst({
        where: { emailAddress: memberEmail },
        select: { id: true, roles: true },
    });
    if (!member) throw new Error('[getMember]: No member user found');
    if (!member.roles.includes(Role.member))
        throw new Error('[getMember]: User is not a member');

    return { memberId: member.id };
};
