import Stack from '@mui/material/Stack';
import { IconButton, Paragraph } from '@/lib/shared/components/ui';
import { TherifyUser } from '@/lib/shared/types';
import { PlanBadge } from './PlanBadge';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { UnderlinedButton } from '../../ui/UnderLinedButton';
import { useState } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export interface Dependent {
    id: string;
    givenName: string;
    surname: string;
    emailAddress: string;
}
interface PlanDetailsProps {
    plan: TherifyUser.TherifyUser['plan'];
    dependents: Dependent[];
    onRemoveDependent: (dependentId: string) => void;
}

export const PlanDetails = ({
    plan,
    dependents,
    onRemoveDependent,
}: PlanDetailsProps) => {
    const [showDependents, setShowDependents] = useState(false);
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
                    {showDependents && (
                        <Stack pl={4} mb={4}>
                            <Paragraph bold noMargin>
                                Your Dependents
                            </Paragraph>
                            {dependents.map((dependent) => (
                                <Dependent
                                    key={dependent.id}
                                    dependent={dependent}
                                    onRemoveDependent={onRemoveDependent}
                                />
                            ))}
                        </Stack>
                    )}
                    <UnderlinedButton
                        onClick={() => setShowDependents(!showDependents)}
                    >
                        {showDependents ? 'Cancel' : 'Remove dependents'}
                    </UnderlinedButton>
                </>
            )}
        </Box>
    );
};

const Dependent = ({
    dependent,
    onRemoveDependent,
}: {
    dependent: Dependent;
    onRemoveDependent: (dependentId: string) => void;
}) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            borderBottom={`1px solid ${theme.palette.divider}`}
            p={2}
        >
            <Paragraph
                noMargin
            >{`${dependent.givenName} ${dependent.surname}`}</Paragraph>
            <IconButton
                size="small"
                type="text"
                onClick={() => onRemoveDependent(dependent.id)}
                color="error"
            >
                <DeleteOutline />
            </IconButton>
        </Stack>
    );
};
