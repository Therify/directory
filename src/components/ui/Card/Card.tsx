import { Box } from '@mui/material';
import { useTheme, styled, SxProps, Theme } from '@mui/material/styles';
import { colors } from '../../themes/therify-design-system';
import { Button, BUTTON_SIZE, BUTTON_TYPE } from '../Button';
import { H5, Paragraph, PARAGRAPH_SIZE } from '../Typography';

interface BaseCardProps {
    width?: string;
    title?: string;
    bodyText?: string;
    headerSlot?: React.ReactNode;
    preBodySlot?: React.ReactNode;
    postBodySlot?: React.ReactNode;
    fullWidthButton?: boolean;
    shouldStackButtons?: boolean;
    backgroundImageCard?: boolean;
    withBoxShadow?: boolean;
    sx?: SxProps<Theme>;
}

type PrimaryButtonProps =
    | {
          primaryButtonText: string;
          primaryButtonOnClick: () => void;
          primaryButtonDisabled?: boolean;
      }
    | {
          primaryButtonText?: undefined;
          primaryButtonOnClick?: undefined;
          primaryButtonDisabled?: boolean;
      };

type SecondaryButtonProps =
    | {
          secondaryButtonText: string;
          secondaryButtonOnClick: () => void;
          secondaryButtonDisabled?: boolean;
      }
    | {
          secondaryButtonText?: undefined;
          secondaryButtonOnClick?: undefined;
          secondaryButtonDisabled?: boolean;
      };

type ImageProps =
    | {
          imageUrl: string;
          imageAltText: string;
      }
    | {
          imageUrl?: undefined;
          imageAltText?: undefined;
      };

type Clickable = {
    onClick?: () => void;
};

type CardProps = BaseCardProps &
    ImageProps &
    PrimaryButtonProps &
    SecondaryButtonProps &
    Clickable;

export const TEST_IDS = {
    CONTAINER: 'card-container',
    HEADER_SLOT: 'card-header-slot',
    IMAGE: 'card-image',
    PRE_BODY_SLOT: 'card-pre-body-slot',
    BODY_TEXT: 'card-body-text',
    POST_BODY_SLOT: 'card-post-body-slot',
    PRIMARY_BUTTON: 'card-primary-button',
    SECONDARY_BUTTON: 'card-secondary-button',
};

export const Card = ({
    title,
    width = '300px',
    imageUrl,
    imageAltText,
    withBoxShadow,
    bodyText,
    headerSlot,
    preBodySlot,
    postBodySlot,
    fullWidthButton,
    shouldStackButtons,
    primaryButtonOnClick,
    primaryButtonText,
    secondaryButtonText,
    secondaryButtonOnClick,
    primaryButtonDisabled,
    secondaryButtonDisabled,
    backgroundImageCard,
    onClick,
    sx,
}: CardProps) => {
    const theme = useTheme();
    const isPrimaryButton = primaryButtonText && primaryButtonOnClick;
    const isSecondaryButton = secondaryButtonText && secondaryButtonOnClick;
    return (
        <CardContainer
            data-testid={TEST_IDS.CONTAINER}
            withBoxShadow={withBoxShadow}
            width={width}
            backgroundImg={backgroundImageCard ? imageUrl : undefined}
            clickable={Boolean(onClick)}
            onClick={() => onClick?.()}
            sx={sx}
        >
            <CardContent>
                {headerSlot && (
                    <Box
                        data-testid={TEST_IDS.HEADER_SLOT}
                        marginBottom={theme.spacing(7)}
                    >
                        {headerSlot}
                    </Box>
                )}
                {imageUrl && !backgroundImageCard && (
                    <Box
                        data-testid={TEST_IDS.IMAGE}
                        width="100%"
                        maxHeight="191px"
                        overflow="hidden"
                        marginBottom={theme.spacing(7)}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={imageAltText} src={imageUrl} width="100%" />
                    </Box>
                )}

                {preBodySlot && (
                    <Box
                        data-testid={TEST_IDS.PRE_BODY_SLOT}
                        marginBottom={theme.spacing(7)}
                    >
                        {preBodySlot}
                    </Box>
                )}
                <Box marginBottom={theme.spacing(7)}>
                    {title && <H5>{title}</H5>}
                    {bodyText && (
                        <Paragraph
                            data-testid={TEST_IDS.BODY_TEXT}
                            size={PARAGRAPH_SIZE.SMALL}
                            style={{
                                marginTop: theme.spacing(4),
                                color: colors.neutral.black[500],
                            }}
                        >
                            {bodyText}
                        </Paragraph>
                    )}
                </Box>
                {postBodySlot && (
                    <Box
                        data-testid={TEST_IDS.POST_BODY_SLOT}
                        marginBottom={theme.spacing(7)}
                    >
                        {postBodySlot}
                    </Box>
                )}
                <Box
                    display="flex"
                    width="100%"
                    flexDirection={shouldStackButtons ? 'column' : 'row'}
                >
                    {isPrimaryButton && (
                        <Button
                            data-testid={TEST_IDS.PRIMARY_BUTTON}
                            disabled={primaryButtonDisabled}
                            fullWidth={fullWidthButton}
                            size={BUTTON_SIZE.SMALL}
                            onClick={primaryButtonOnClick}
                            style={{
                                marginRight:
                                    isSecondaryButton && !shouldStackButtons
                                        ? theme.spacing(fullWidthButton ? 7 : 4)
                                        : 0,
                                marginBottom:
                                    isSecondaryButton && shouldStackButtons
                                        ? theme.spacing(4)
                                        : 0,
                            }}
                        >
                            {primaryButtonText}
                        </Button>
                    )}
                    {isSecondaryButton && (
                        <Button
                            data-testid={TEST_IDS.SECONDARY_BUTTON}
                            disabled={secondaryButtonDisabled}
                            fullWidth={fullWidthButton}
                            size={BUTTON_SIZE.SMALL}
                            type={BUTTON_TYPE.OUTLINED}
                            color="info"
                            onClick={secondaryButtonOnClick}
                        >
                            {secondaryButtonText}
                        </Button>
                    )}
                </Box>
            </CardContent>
        </CardContainer>
    );
};

const CardContainer = styled(Box, {
    shouldForwardProp: (prop) =>
        ['backgroundImg', 'width', 'withBoxShadow', 'clickable'].every(
            (customProp) => prop !== customProp
        ),
})<{
    width: string;
    backgroundImg?: string;
    withBoxShadow?: boolean;
    clickable: boolean;
}>(({ theme, width, backgroundImg, withBoxShadow, clickable }) => ({
    width,
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    padding: theme.spacing(6),
    position: 'relative',
    overflow: 'hidden',
    ...(withBoxShadow && {
        boxShadow: theme.shadows[2],
    }),
    ...(backgroundImg && {
        justifyContent: 'flex-end',
        height: '400px',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: theme.palette.common.white,
        '&::before': {
            zIndex: 1,
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
                'linear-gradient(rgba(35,27,20, 0) 0%,rgba(35,27,20, 1) 100%)',
        },
    }),
    ...(clickable && {
        cursor: 'pointer',
        '&::after': {
            zIndex: 3,
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            background: theme.palette.background.default,
            transition: 'opacity 0.2s ease-in-out',
        },
        '&:hover::after': {
            opacity: 0.1,
        },
    }),
}));

const CardContent = styled(Box)(() => ({
    zIndex: 2,
    position: 'relative',
    width: '100%',
}));
