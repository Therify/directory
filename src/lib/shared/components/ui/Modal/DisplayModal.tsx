import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Modal as MuiModal } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { CSSProperties, ReactNode } from 'react';
import { Button, BUTTON_SIZE, BUTTON_TYPE, IconButton } from '../Button';
import { Divider } from '../Divider';
import { H4, Paragraph, PARAGRAPH_FONT_WEIGHT } from '../Typography';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    style?: CSSProperties;
    headerSlot?: ReactNode;
    title?: string;
    message?: string;
    alignContentCenter?: boolean;
    showCloseButton?: boolean;
    closeButtonDisabled?: boolean;
    fullWidthButtons?: boolean;
    shouldStackButtons?: boolean;
    allowBackdropClose?: boolean;
    hideBackdrop?: boolean;
    children?: ReactNode;
}
type Color =
    | 'error'
    | 'success'
    | 'inherit'
    | 'primary'
    | 'warning'
    | 'secondary'
    | 'info';

type BasePrimaryButtonProps = {
    primaryButtonDisabled?: boolean;
    primaryButtonEndIcon?: ReactNode;
    primaryButtonStartIcon?: ReactNode;
    primaryButtonColor?: Color;
};

type PrimaryButtonProps = (
    | {
          primaryButtonText: string;
          primaryButtonOnClick: () => void;
      }
    | {
          primaryButtonText?: undefined;
          primaryButtonOnClick?: undefined;
      }
) &
    BasePrimaryButtonProps;

type BaseSecondaryButtonProps = {
    secondaryButtonDisabled?: boolean;
    secondaryButtonEndIcon?: ReactNode;
    secondaryButtonStartIcon?: ReactNode;
    secondaryButtonColor?: Color;
};

type SecondaryButtonProps = (
    | {
          secondaryButtonText: string;
          secondaryButtonOnClick: () => void;
      }
    | {
          secondaryButtonText?: undefined;
          secondaryButtonOnClick?: undefined;
      }
) &
    BaseSecondaryButtonProps;

type DisplayModalProps = BaseModalProps &
    PrimaryButtonProps &
    SecondaryButtonProps;

const TEST_IDS = {
    MODAL: 'modal',
    TITLE: 'modal-title',
    MESSAGE: 'modal-message',
    HEADER_SLOT: 'modal-header-slot',
    POST_BODY_SLOT: 'modal-post-body-slot',
    PRIMARY_BUTTON: 'modal-primary-button',
    SECONDARY_BUTTON: 'modal-secondary-button',
    CLOSE_BUTTON: 'modal-close-button',
};

export const DisplayModal = ({
    title,
    message,
    headerSlot,
    isOpen,
    onClose,
    allowBackdropClose = true,
    style,
    alignContentCenter,
    showCloseButton = true,
    closeButtonDisabled,
    primaryButtonText,
    primaryButtonOnClick,
    primaryButtonDisabled,
    primaryButtonEndIcon,
    primaryButtonStartIcon,
    primaryButtonColor,
    secondaryButtonEndIcon,
    secondaryButtonStartIcon,
    secondaryButtonText,
    secondaryButtonOnClick,
    secondaryButtonDisabled,
    secondaryButtonColor,
    fullWidthButtons,
    shouldStackButtons,
    hideBackdrop,
    children,
}: DisplayModalProps) => {
    const theme = useTheme();
    const horizontalAlignment = alignContentCenter ? 'center' : 'flex-start';
    const isPrimaryButton = Boolean(primaryButtonText && primaryButtonOnClick);
    const isSecondaryButton = Boolean(
        secondaryButtonText && secondaryButtonOnClick
    );
    const isButtonPresent = isPrimaryButton || isSecondaryButton;
    const isBodyContent = Boolean(title || message);
    return (
        <MuiModal
            data-testid={TEST_IDS.MODAL}
            open={isOpen}
            hideBackdrop={hideBackdrop}
            onClose={allowBackdropClose ? onClose : undefined}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...getBaseStyle(theme), ...style }}>
                {showCloseButton && (
                    <IconButton
                        data-testid={TEST_IDS.CLOSE_BUTTON}
                        onClick={onClose}
                        disabled={closeButtonDisabled}
                        type={BUTTON_TYPE.TEXT}
                        color="info"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                {headerSlot && (
                    <Box
                        data-testid={TEST_IDS.HEADER_SLOT}
                        marginBottom={isBodyContent ? theme.spacing(4) : 0}
                        display="flex"
                        justifyContent={horizontalAlignment}
                        paddingX={theme.spacing(6)}
                    >
                        {headerSlot}
                    </Box>
                )}
                <Box
                    flex={1}
                    textAlign={alignContentCenter ? 'center' : 'left'}
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                >
                    {title && (
                        <Box paddingX={theme.spacing(6)}>
                            <H4 data-testid={TEST_IDS.TITLE}>{title}</H4>
                            <Divider style={{ marginBottom: 0 }} />
                        </Box>
                    )}
                    <Box flex={1} overflow="auto" paddingY={2} paddingX={6}>
                        {children}
                    </Box>
                </Box>

                {isButtonPresent && (
                    <Box
                        display="flex"
                        justifyContent={horizontalAlignment}
                        width="100%"
                        marginTop={theme.spacing(4)}
                        flexDirection={
                            shouldStackButtons ? 'column-reverse' : 'row'
                        }
                        paddingX={theme.spacing(6)}
                    >
                        {isSecondaryButton && (
                            <Button
                                data-testid={TEST_IDS.SECONDARY_BUTTON}
                                disabled={secondaryButtonDisabled}
                                fullWidth={fullWidthButtons}
                                size={BUTTON_SIZE.SMALL}
                                type={BUTTON_TYPE.OUTLINED}
                                color={secondaryButtonColor ?? 'info'}
                                onClick={secondaryButtonOnClick}
                                endIcon={secondaryButtonEndIcon}
                                startIcon={secondaryButtonStartIcon}
                                style={{
                                    marginRight:
                                        isPrimaryButton && !shouldStackButtons
                                            ? theme.spacing(4)
                                            : 0,
                                    marginTop:
                                        isPrimaryButton && shouldStackButtons
                                            ? theme.spacing(4)
                                            : 0,
                                }}
                            >
                                {secondaryButtonText}
                            </Button>
                        )}
                        {isPrimaryButton && (
                            <Button
                                color={primaryButtonColor ?? 'primary'}
                                data-testid={TEST_IDS.PRIMARY_BUTTON}
                                disabled={primaryButtonDisabled}
                                fullWidth={fullWidthButtons}
                                size={BUTTON_SIZE.SMALL}
                                onClick={primaryButtonOnClick}
                                startIcon={primaryButtonStartIcon}
                                endIcon={primaryButtonEndIcon}
                            >
                                {primaryButtonText}
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </MuiModal>
    );
};

const getBaseStyle = (theme: Theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '680px',
    maxWidth: '90%',
    minHeight: '400px',
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    borderRadius: '6px',
    boxShadow: 24,
    paddingY: theme.spacing(6),
});
