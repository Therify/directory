import { Button } from '@/lib/shared/components/ui';
import { ConnectionRequest } from '@/lib/shared/types';
import { ConnectionStatus } from '@prisma/client';

export const ActionButtons = ({
    connectionRequest,
    onAccept,
    onDecline,
    onView,
    onOpenChat,
}: {
    connectionRequest: ConnectionRequest.Type;
    onAccept: () => void;
    onDecline: () => void;
    onView?: () => void;
    onOpenChat?: () => void;
}) => {
    const isPending =
        connectionRequest.connectionStatus === ConnectionStatus.pending;
    const isAccepted =
        connectionRequest.connectionStatus === ConnectionStatus.accepted;
    return (
        <>
            {isPending && (
                <>
                    <Button
                        size="small"
                        onClick={onAccept}
                        sx={{ marginRight: 2 }}
                    >
                        Accept
                    </Button>
                    <Button
                        size="small"
                        type="outlined"
                        color="info"
                        onClick={onDecline}
                    >
                        Decline
                    </Button>
                </>
            )}
            {isAccepted && (
                <>
                    {!onOpenChat && (
                        <Button
                            size="small"
                            color="info"
                            type="outlined"
                            onClick={onView}
                        >
                            View Member
                        </Button>
                    )}
                    {onOpenChat && (
                        <Button
                            size="small"
                            color="info"
                            type="outlined"
                            onClick={onOpenChat}
                        >
                            Chat
                        </Button>
                    )}
                </>
            )}
        </>
    );
};
