import { IconButton, H3, Paragraph } from '@/lib/shared/components/ui';
import { ConnectionRequest } from '@/lib/shared/types';
import { Modal as MuiModal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatReimbursementRequestUrl } from '@/lib/shared/utils';
import { Close } from '@mui/icons-material';
import { ProfileType } from '@prisma/client';
import { useRef, useEffect, useState } from 'react';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146' as const;

interface ReimbursementModalProps {
    designation: ProfileType;
    connectionRequest: ConnectionRequest.Type;
    onClose: () => void;
    onSubmitCallback?: () => void;
}

export const ReimbursementModal = ({
    designation,
    connectionRequest,
    onClose,
    onSubmitCallback,
}: ReimbursementModalProps) => {
    const timeoutRef = useRef<number>();
    const [shouldCallCb, setShouldCallCb] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        timeoutRef.current = window.setTimeout(() => {
            setShouldCallCb(true);
        }, 5000);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleClose = () => {
        if (shouldCallCb && onSubmitCallback) {
            onSubmitCallback();
        }
        onClose();
    };
    return (
        <Modal open onClose={handleClose}>
            <ModalContent>
                <TitleContainer>
                    <Box>
                        <Paragraph margin={0} bold>
                            Reimbursement Request
                        </Paragraph>
                        <H3 style={{ marginBottom: 0 }}>
                            {connectionRequest.member.givenName}{' '}
                            {connectionRequest.member.surname}
                        </H3>
                    </Box>
                    <IconButton color="info" type="text" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </TitleContainer>
                <Iframe
                    src={formatReimbursementRequestUrl({
                        baseUrl: REIMBURSEMENT_REQUEST_URL,
                        connectionRequest,
                        designation,
                        hideTitle: true,
                    })}
                />
            </ModalContent>
        </Modal>
    );
};

const Modal = styled(MuiModal)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '6px',
    boxShadow: theme.shadows[5],
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
        width: '50%',
        maxWidth: '800px',
        height: '80%',
    },
}));

const TitleContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Iframe = styled('iframe')({
    flex: 1,
    border: 'none',
});
