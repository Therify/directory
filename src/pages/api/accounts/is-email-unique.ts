import { NextApiRequest, NextApiResponse } from 'next';
import { AccountsService } from '@/lib/modules/accounts/service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { emailAddress } = req.query;
    if (!emailAddress) {
        return res
            .status(400)
            .json({ isUnique: false, errors: ['emailAddress is required'] });
    }
    const isUnique = await AccountsService.isEmailUnique({
        emailAddress: emailAddress.toString(),
    });

    res.status(200).json({ isUnique, errors: [] });
}
