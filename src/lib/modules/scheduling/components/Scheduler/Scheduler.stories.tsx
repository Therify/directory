import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { useTheme } from '@mui/material';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import {
    PARAGRAPH_SIZE,
    Paragraph,
    Button,
    BUTTON_TYPE,
    BUTTON_SIZE,
} from '@/lib/shared/components/ui';
import { generateMockTimes } from './__mocks__/timeSlots';
import { Scheduler as SchedulerComponent } from './Scheduler';
import { SchedulerWidget as WidgetComponent } from './SchedulerWidget';
import { SchedulerDrawer as DrawerComponent } from './SchedulerDrawer';

export default {
    title: 'Scheduling/Scheduler',
    decorators: [withKnobs],
} as Meta;

export const Scheduler: Story = () => {
    const theme = useTheme();
    return (
        <div
            style={{
                padding: theme.spacing(6),
            }}
        >
            <SchedulerComponent
                isLoading={boolean('Is loading?', false)}
                timeSlots={generateMockTimes(
                    number('Number of Days with availability', 10),
                    number('Number of time slots per day', 8)
                )}
                defaultVisibleTimesCount={number(
                    'Number of time slots visible by default',
                    3
                )}
                paginationSize={number('Number of days per page', 3)}
                onSchedule={action('Schedule')}
                headerSlot={boolean('Show Header', false) && <Header />}
                error={
                    boolean('Show Error', false)
                        ? 'There was an error.'
                        : undefined
                }
            >
                {boolean('Show Footer', false) && <Footer />}
            </SchedulerComponent>
        </div>
    );
};

export const SchedulerWidget: Story = () => {
    return (
        <WidgetComponent
            isLoading={boolean('Is loading?', false)}
            title={text('Title', 'Would you like to meet?')}
            subtitle={text(
                'Subtitle',
                'All times are listed in your current timezone.'
            )}
            timeSlots={generateMockTimes(
                number('Number of Days with availability', 10),
                number('Number of time slots per day', 8)
            )}
            defaultVisibleTimesCount={number(
                'Number of time slots visible by default',
                3
            )}
            paginationSize={number('Number of days per page', 3)}
            onSchedule={action('Schedule')}
            error={
                boolean('Show Error', false) ? 'There was an error.' : undefined
            }
        >
            {boolean('Show Footer', true) && <Footer />}
        </WidgetComponent>
    );
};

export const SchedulerDrawer: Story = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Schedule now</Button>
            <DrawerComponent
                isLoading={boolean('Is loading?', false)}
                isOpen={isOpen}
                title={text('drawer Title', 'Book session')}
                paginationSize={2}
                timeSlots={generateMockTimes(
                    number('Number of Days with availability', 10),
                    number('Number of time slots per day', 8)
                )}
                onSchedule={action('Schedule')}
                onClose={() => setIsOpen(false)}
                error={
                    boolean('Show Error', false)
                        ? 'There was an error.'
                        : undefined
                }
            />
        </>
    );
};

const Header = () => {
    const theme = useTheme();
    return (
        <>
            <Paragraph noMargin size={PARAGRAPH_SIZE.LARGE} bold>
                This is the header slot?
            </Paragraph>
            <Paragraph style={{ color: theme.palette.info.main }}>
                All times are listed in your current timezone.
            </Paragraph>
        </>
    );
};

const Footer = () => {
    const theme = useTheme();
    return (
        <>
            <Paragraph style={{ fontWeight: 500 }}>
                $0-1000
                <span
                    style={{
                        fontWeight: 400,
                        color: theme.palette.info.main,
                        marginLeft: theme.spacing(2),
                    }}
                >
                    {' '}
                    per session
                </span>
            </Paragraph>
            <Paragraph size={PARAGRAPH_SIZE.SMALL} noMargin>
                This is the footer slot (passed as regular children)
            </Paragraph>
            <Button
                type={BUTTON_TYPE.OUTLINED}
                size={BUTTON_SIZE.SMALL}
                style={{
                    marginTop: theme.spacing(7),
                }}
            >
                Get exact price
            </Button>
        </>
    );
};
