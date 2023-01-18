import { CreatePractice } from '@/lib/features/onboarding';
import type { CreatePracticeTransaction } from './definition';

interface CreatePracticeEntityFactory {
    (
        params: CreatePractice.Input
    ): CreatePracticeTransaction['createPracticeEntity'];
}

export const factory: CreatePracticeEntityFactory = ({
    name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    website,
}) => {
    return {
        async commit({ prisma }) {
            // TODO: How do we know which user "owns" this practice? (in our data, not the business owner)
            const { id: practiceId } = await prisma.practice.create({
                data: {
                    name,
                    address,
                    city,
                    state,
                    zip,
                    phone,
                    email,
                    website,
                },
            });

            return {
                practiceId,
            };
        },
        rollback({ prisma }, { createPracticeEntity: { practiceId: id } }) {
            return prisma.practice.delete({
                where: {
                    id,
                },
            });
        },
    };
};
