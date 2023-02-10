import { Box } from '@mui/material';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import { Button, BUTTON_SIZE, BUTTON_TYPE } from '../Button';
import { Paragraph, PARAGRAPH_SIZE } from '../Typography';

interface ListItemBaseProps {
    title?: string;
    bodyText?: string;
    wrapperSx?: SxProps<Theme>;
}

type ImageProps =
    | {
          imageUrl: string;
          imageAltText: string;
      }
    | {
          imageUrl?: undefined;
          imageAltText?: undefined;
      };

type ButtonProps =
    | {
          buttonText: string;
          buttonOnClick: () => void;
          buttonDisabled?: boolean;
      }
    | {
          buttonText?: undefined;
          buttonOnClick?: undefined;
          buttonDisabled?: boolean;
      };
type ListItemProps = ListItemBaseProps & ImageProps & ButtonProps;

export const TEST_IDS = {
    IMAGE: 'li-image',
    BODY_TEXT: 'li-body-text',
    BUTTON: 'li-button',
};

export const ListItemOld = ({
    title,
    bodyText,
    imageUrl,
    imageAltText,
    buttonText,
    buttonOnClick,
    buttonDisabled,
    children,
    wrapperSx,
}: React.PropsWithChildren<ListItemProps>) => {
    const { palette, spacing } = useTheme();
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            sx={wrapperSx}
        >
            {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    data-testid={TEST_IDS.IMAGE}
                    src={imageUrl}
                    alt={imageAltText}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '6px',
                        marginRight: spacing(7),
                    }}
                />
            )}
            <Box flexGrow={1}>
                {title && (
                    <Paragraph
                        size={PARAGRAPH_SIZE.MEDIUM}
                        style={{ fontWeight: 500 }}
                    >
                        {title}
                    </Paragraph>
                )}
                {bodyText && (
                    <Paragraph
                        data-testid={TEST_IDS.BODY_TEXT}
                        size={PARAGRAPH_SIZE.SMALL}
                        style={{ color: palette.text.secondary }}
                    >
                        {bodyText}
                    </Paragraph>
                )}
                {children}
            </Box>
            {buttonText && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    paddingLeft={spacing(7)}
                >
                    <Button
                        data-testid={TEST_IDS.BUTTON}
                        color="info"
                        disabled={buttonDisabled}
                        type={BUTTON_TYPE.OUTLINED}
                        size={BUTTON_SIZE.SMALL}
                        onClick={buttonOnClick}
                    >
                        {buttonText}
                    </Button>
                </Box>
            )}
        </Box>
    );
};
