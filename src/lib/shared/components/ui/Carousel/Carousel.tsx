import { UIEventHandler, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, List } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
    ChevronLeftRounded as LeftIcon,
    ChevronRightRounded as RightIcon,
} from '@mui/icons-material';
import { BUTTON_TYPE, BUTTON_SIZE, IconButton } from '../Button';
import { H2, Paragraph } from '../Typography';

interface CarouselProps {
    title?: string;
    subTitle?: string;
    hideControls?: boolean;
    postTitleSlot?: React.ReactNode;
    items: React.ReactNode[];
    disableHoverEffect?: boolean;
    withOverflowShadow?: boolean;
}

const hoverClassName = 'carousel-hoverable-on';

export const Carousel = ({
    title,
    subTitle,
    postTitleSlot,
    hideControls,
    items,
    disableHoverEffect,
    withOverflowShadow = true,
}: CarouselProps) => {
    const theme = useTheme();
    const carouselRef = useRef<HTMLUListElement | null>(null);
    const scrollDebounceRef = useRef<number | undefined>();

    const [viewIndex, setViewIndex] = useState(0);
    const [rightScrollOverflow, setRightScrollOverflow] = useState(0);
    const [itemWidths, setItemWidths] = useState<number[]>([]);

    useEffect(() => {
        const elements = Array.from(carouselRef.current?.children ?? []);
        setItemWidths(elements.map((item) => item.clientWidth));
    }, [carouselRef]);

    const onScrollNext = () => {
        const viewportWidth = carouselRef.current?.clientWidth ?? 0;
        let scrollDistance = 0;
        let scrollToPosition = 0;
        const lastItemWidth = itemWidths[itemWidths.length - 1] ?? 0;
        if (rightScrollOverflow < lastItemWidth) {
            scrollToPosition = carouselRef.current?.scrollWidth ?? 0;
        } else {
            for (let index = viewIndex; index < itemWidths.length; index++) {
                const nextScrollDistance = scrollDistance + itemWidths[index];
                if (nextScrollDistance > viewportWidth) {
                    scrollToPosition =
                        (carouselRef.current?.scrollLeft ?? 0) + scrollDistance;
                    break;
                }
                scrollDistance = nextScrollDistance;
            }
        }
        return carouselRef.current?.scrollTo({
            left: scrollToPosition,
            behavior: 'smooth',
        });
    };

    const onScrollPrevious = () => {
        const viewportWidth = carouselRef.current?.clientWidth ?? 0;
        let scrollDistance = 0;
        let scrollToPosition = 0;
        for (let index = viewIndex; index >= 0; index--) {
            const nextScrollDistance = scrollDistance + itemWidths[index];
            if (nextScrollDistance > viewportWidth) {
                scrollToPosition =
                    (carouselRef.current?.scrollLeft ?? 0) - scrollDistance;
                break;
            }
            scrollDistance = nextScrollDistance;
        }
        return carouselRef.current?.scrollTo({
            left: scrollToPosition < 0 ? 0 : scrollToPosition,
            behavior: 'smooth',
        });
    };

    const onScroll: UIEventHandler<HTMLUListElement> = ({
        currentTarget: { scrollLeft, scrollWidth },
    }) => {
        clearTimeout(scrollDebounceRef.current);
        if (!disableHoverEffect) {
            // Disables hover styles while scrolling
            carouselRef.current?.classList.remove(hoverClassName);
        }
        // Allow scroll to complete before calculating view index
        scrollDebounceRef.current = window.setTimeout(() => {
            let widthAccumulator = 0;
            let index = 0;
            for (const itemWidth of itemWidths) {
                widthAccumulator += itemWidth;
                if (widthAccumulator > scrollLeft) {
                    break;
                }
                index++;
            }
            const rightOverflow =
                scrollWidth -
                ((carouselRef.current?.clientWidth ?? 0) + scrollLeft);

            setRightScrollOverflow(rightOverflow);
            setViewIndex(index);
            if (!disableHoverEffect) {
                carouselRef.current?.classList.add(hoverClassName);
            }
        }, 50);
    };

    return (
        <Container>
            <Header>
                <TitleSection>
                    {title && <H2 marginBottom={theme.spacing(4)}>{title}</H2>}
                    {subTitle && <Paragraph>{subTitle}</Paragraph>}
                    <Slot>{postTitleSlot}</Slot>
                </TitleSection>
                {!hideControls && (
                    <ControlsContainer>
                        <Controls>
                            <IconButton
                                onClick={onScrollPrevious}
                                disabled={viewIndex === 0}
                                color="info"
                                size={BUTTON_SIZE.SMALL}
                                type={BUTTON_TYPE.TEXT}
                            >
                                <LeftIcon />
                            </IconButton>
                            <IconButton
                                onClick={onScrollNext}
                                disabled={rightScrollOverflow === 0}
                                color="info"
                                size={BUTTON_SIZE.SMALL}
                                type={BUTTON_TYPE.TEXT}
                                style={{ marginLeft: theme.spacing(6) }}
                            >
                                <RightIcon />
                            </IconButton>
                        </Controls>
                    </ControlsContainer>
                )}
            </Header>
            <TrackContainer>
                <Track
                    className={disableHoverEffect ? undefined : hoverClassName}
                    ref={carouselRef}
                    onScroll={onScroll}
                >
                    {items.map((item, index) => (
                        <Item key={index}>{item}</Item>
                    ))}
                </Track>
                {withOverflowShadow && (
                    <>
                        <TrackEdge side="left" isVisible={viewIndex !== 0} />
                        <TrackEdge
                            side="right"
                            isVisible={rightScrollOverflow > 0}
                        />
                    </>
                )}
            </TrackContainer>
        </Container>
    );
};

const TrackEdge = ({
    side,
    isVisible,
}: {
    isVisible: boolean;
    side: 'left' | 'right';
}) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: Number(isVisible) }}
        transition={{ duration: 0.3 }}
    >
        <TrackEdgeShadow side={side} />
    </motion.div>
);

const Container = styled(Box)(() => ({
    width: '100%',
    position: 'relative',
}));
const TrackContainer = styled(Box)(() => ({
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
}));

const Track = styled(List)(({ theme }) => ({
    width: '100%',
    position: 'relative',
    padding: theme.spacing(4),
    display: 'flex',
    overflowX: 'scroll',
    scrollPadding: '0',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    [`&.${hoverClassName} li:hover`]: {
        cursor: 'pointer',
        transform: 'translate3d( 0, -6px, 0)',
        transition: 'transform 0.2s ease-in-out',
    },
}));
const TrackEdgeShadow = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'side',
})<{ side: 'left' | 'right' }>(({ theme, side }) => ({
    width: theme.spacing(3),
    position: 'absolute',
    // Matches the padding on the track
    top: theme.spacing(4),
    // Height calculated to match the height of the track items
    height: `calc(100% - ${theme.spacing(8)})`,
    [side]: 0,
    zIndex: 1,
    background: `linear-gradient(to ${side}, rgba(0,0,0,0) 0%, rgba(0,0,0,.1) 100%)`,
}));

const Item = styled('li')(({ theme }) => ({
    scrollSnapAlign: 'start',
    flexShrink: 0,
    display: 'inline-block',
    marginRight: theme.spacing(8),
    position: 'relative',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
    display: 'none',
    alignItems: 'flex-end',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));
const Controls = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'flex-end',
}));

const Header = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
}));
const TitleSection = styled(Box)(() => ({
    width: '100%',
    flex: 1,
}));

const Slot = styled(Box)(() => ({
    width: '100%',
    flex: 1,
}));
