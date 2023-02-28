import {
    DisplayModal,
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/lib/shared/components/ui';
import { ConnectionRequest } from '@/lib/shared/types';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

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
                connectionRequest.member.plan.coveredSessions > 0
                    ? `${connectionRequest.member.givenName} has ${
                          connectionRequest.member.plan.coveredSessions
                      } covered sessions from Therify until ${format(
                          new Date(connectionRequest.member.plan.endDate),
                          'MMMM dd, yyyy'
                      )}`
                    : 'No covered sessions. They will use their insurance benefit to cover sessions or pay out of pocket.'}
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
                {connectionRequest.member.memberProfile.state}
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
