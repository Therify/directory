import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { FormRendererTypes } from '@/lib/shared/components/ui';
import z from 'zod';

export const formConfig: FormRendererTypes.FormConfig<
    z.infer<typeof RegisterMember.inputSchema>
> = {
    sections: [],
};
