import {
    DisplayModal,
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/lib/shared/components/ui';
import { ConnectionRequest } from '@/lib/shared/types';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCoveredSessionsMessage } from '../utils';

interface MemberDetailsModalProps {
    connectionRequest: ConnectionRequest.Type;
    onClose: () => void;
}
export const MemberDetailsModal = ({
    connectionRequest,
    onClose,
}: MemberDetailsModalProps) => {
    const theme = useTheme();
    return (
        <DisplayModal
            isOpen
            title={`${connectionRequest.member.givenName} ${connectionRequest.member.surname}`}
            onClose={onClose}
            fullWidthButtons
            secondaryButtonText="Close"
            secondaryButtonOnClick={onClose}
        >
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Account
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                {connectionRequest.member.account.name}
            </Paragraph>
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Payment
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                {connectionRequest.member.plan &&
                    getCoveredSessionsMessage({
                        coveredSessions:
                            connectionRequest.member.plan.coveredSessions,
                        remainingSessions:
                            connectionRequest.member.plan.remainingSessions,
                        name: connectionRequest.member.givenName,
                        planEndDate: connectionRequest.member.plan.endDate,
                    })}
            </Paragraph>
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Contact
            </Paragraph>
            <Link
                href={'mailto:' + connectionRequest.member.emailAddress}
                target="_blank"
                sx={{ color: theme.palette.text.secondary }}
            >
                <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                    {connectionRequest.member.emailAddress}
                </Paragraph>
            </Link>
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Located in
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                {connectionRequest.member.memberProfile.state},{' '}
                {connectionRequest.member.memberProfile.country}
            </Paragraph>
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Insurance Provider
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                {connectionRequest.member.memberProfile.insurance}
            </Paragraph>
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Concerns
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                {connectionRequest.member.memberProfile.concerns.join(', ')}
            </Paragraph>
            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                Goals
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                {connectionRequest.member.memberProfile.goals.join(', ')}
            </Paragraph>
            {connectionRequest.connectionMessage && (
                <>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Message
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {connectionRequest.connectionMessage}
                    </Paragraph>
                </>
            )}
        </DisplayModal>
    );
};
