import { Box, Paper } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { Badge, BADGE_SIZE, BADGE_COLOR } from '../Badge';
import { AbstractShape1, AbstractShape2 } from '../Shapes';
import { H3, PARAGRAPH_SIZE, Paragraph } from '../Typography';
import { Toggle, TOGGLE_TYPE } from '../FormElements';
export interface PricingTableFeature {
    feature: string;
    checked: boolean;
}
interface PricingTableProps {
    badge?: React.ReactNode;
    shape?: 1 | 2 | 3 | 4;
    price?: React.ReactNode;
    priceDescription?: string;
    featuresTitle?: string;
    features?: PricingTableFeature[];
    children?: React.ReactNode;
    footerText?: string;
    sx?: SxProps<Theme>;
    onClick?: () => void;
}

export const PricingTable = ({
    price,
    shape = 1,
    badge,
    priceDescription,
    featuresTitle,
    features,
    footerText,
    children,
    sx,
    onClick,
}: PricingTableProps) => {
    return (
        <Container onClick={onClick} sx={sx}>
            {shape && getShape(shape)}
            <Content>
                <BadgeContainer>
                    {typeof badge === 'string' ? (
                        <Badge
                            color={BADGE_COLOR.NEUTRAL_LIGHT}
                            size={BADGE_SIZE.SMALL}
                        >
                            {badge}
                        </Badge>
                    ) : (
                        badge
                    )}
                </BadgeContainer>
                {price &&
                    (typeof price === 'string' ? (
                        <Price>{price}</Price>
                    ) : (
                        price
                    ))}
                {priceDescription && (
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {priceDescription}
                    </Paragraph>
                )}
                {featuresTitle && <Paragraph bold>{featuresTitle}</Paragraph>}
                {features && (
                    <FeatureContainer>
                        {features.map((feature, i) => (
                            <FeatureItem key={i}>
                                <FeatureCheckbox
                                    type={TOGGLE_TYPE.CHECKBOX}
                                    checked={feature.checked}
                                    displayText={feature.feature}
                                />
                            </FeatureItem>
                        ))}
                    </FeatureContainer>
                )}
                {children && <ChildrenContainer>{children}</ChildrenContainer>}
                {footerText && <FooterText italic>{footerText}</FooterText>}
            </Content>
        </Container>
    );
};
const getShape = (shape: PricingTableProps['shape']) => {
    const styles: React.CSSProperties = {
        position: 'absolute',
        height: '260px',
        top: '-70px',
        right: '-20px',
        zIndex: 1,
    };
    switch (shape) {
        case 1:
            return (
                <AbstractShape1
                    style={{
                        ...styles,
                        right: '-56px',
                        transform: 'rotate(300deg)',
                    }}
                />
            );
        case 2:
            return (
                <AbstractShape2
                    style={{ ...styles, transform: 'rotate(300deg)' }}
                />
            );
        case 3:
            return (
                <AbstractShape1
                    style={{ ...styles, transform: 'rotate(30deg)' }}
                />
            );
        case 4:
            return (
                <AbstractShape2
                    style={{ ...styles, transform: 'rotate(30deg)' }}
                />
            );
        default:
            return null;
    }
};

const Container = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    width: '300px',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
        width: '340px',
    },
}));
const Content = styled(Box)({
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 2,
});
const ChildrenContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    width: '100%',
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(16),
}));

const Price = styled(H3)(({ theme }) => ({
    ...theme.typography.h2,
    marginBottom: 0,
}));

const FeatureContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 0),
    '&:first-of-type': {
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    '&:last-of-type': {
        borderBottom: 'none',
    },
}));

const FeatureCheckbox = styled(Toggle)(({ theme, checked }) => ({
    pointerEvents: 'none',
    cursor: 'default',
    ...(!checked && {
        textDecoration: 'line-through',
        color: theme.palette.text.disabled,
    }),
}));

const FooterText = styled(Paragraph)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));
