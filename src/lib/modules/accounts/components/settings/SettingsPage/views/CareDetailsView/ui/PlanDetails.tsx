import Stack from '@mui/material/Stack';
import { Paragraph } from '@/lib/shared/components/ui';
import { TherifyUser } from '@/lib/shared/types';
import { PlanBadge } from './PlanBadge';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { UnderlinedButton } from '../../ui/UnderLinedButton';

export interface Dependent {
    id: string;
    givenName: string;
    surname: string;
    emailAddress: string;
}
interface PlanDetailsProps {
    plan: TherifyUser.TherifyUser['plan'];
    dependents: Dependent[];
}

export const PlanDetails = ({ plan, dependents }: PlanDetailsProps) => {
    return (
        <Box mb={10}>
            <Stack direction="row" marginBottom={4}>
                <Paragraph bold>Your Current Plan</Paragraph>
                {plan && <PlanBadge plan={plan} />}
            </Stack>
            {plan && (
                <>
                    <Paragraph>
                        Started:{' '}
                        {format(new Date(plan.startDate), 'MMM do, yyyy')}
                    </Paragraph>
                    <Paragraph>
                        Ends: {format(new Date(plan.endDate), 'MMM do, yyyy')}
                    </Paragraph>
                    {plan.renews && (
                        <Paragraph>Renews: {plan.renews}</Paragraph>
                    )}
                </>
            )}
            {dependents.length > 0 && (
                <>
                    <Paragraph>
                        Dependents:{' '}
                        {dependents
                            .map(
                                ({ givenName, surname }) =>
                                    `${givenName} ${surname}`
                            )
                            .join(', ')}
                    </Paragraph>
                    <UnderlinedButton>Remove dependents</UnderlinedButton>
                </>
            )}
        </Box>
    );
};
