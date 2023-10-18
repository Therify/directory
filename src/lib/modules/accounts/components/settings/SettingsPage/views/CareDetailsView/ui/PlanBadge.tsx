import { Badge } from '@/lib/shared/components/ui';
import { TherifyUser } from '@/lib/shared/types';
import CheckCircle from '@mui/icons-material/CheckCircle';
import CancelRounded from '@mui/icons-material/CancelRounded';
import { PlanStatus } from '@prisma/client';

interface PlanBadgeProps {
    plan: Exclude<TherifyUser.TherifyUser['plan'], null>;
}

export const PlanBadge = ({ plan }: PlanBadgeProps) => {
    const isPlanActive = plan.status === PlanStatus.active;
    return (
        <Badge
            size="small"
            icon={isPlanActive ? <CheckCircle /> : <CancelRounded />}
            color={isPlanActive ? 'success' : 'error'}
            sx={{
                ml: 2,
            }}
        >
            {getPlanStatusText(plan.status)}
        </Badge>
    );
};

const getPlanStatusText = (status: string) => {
    switch (status) {
        case PlanStatus.active:
            return 'Active';
        case PlanStatus.trialing:
            return 'Trialing';
        case PlanStatus.past_due:
            return 'Past Due';
        case PlanStatus.canceled:
            return 'Canceled';
        case PlanStatus.unpaid:
            return 'Unpaid';
        case PlanStatus.incomplete:
            return 'Incomplete';
        case PlanStatus.incomplete_expired:
            return 'Incomplete - Expired';
        default:
            return 'Unknown';
    }
};
