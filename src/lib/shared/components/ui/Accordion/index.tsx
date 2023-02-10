import { KeyboardArrowDownSharp as KeyboardArrowDownSharpIcon } from '@mui/icons-material';
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { List } from '../List';
import {
    Paragraph,
    PARAGRAPH_FONT_WEIGHT,
    PARAGRAPH_SIZE,
} from '../Typography';

export const TEST_IDS = {
    BODY_TEXT: 'accordion-body-text',
};
interface AccordionItem {
    id: string;
    header: string | React.ReactNode;
    body: string | React.ReactNode;
}
interface AccordionProps {
    allowMultiExpand?: boolean;
    withDividers?: boolean;
    items: AccordionItem[];
    defaultExpandedId?: string;
}

export const Accordion = ({
    allowMultiExpand,
    withDividers,
    items,
    defaultExpandedId,
}: AccordionProps) => {
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
        ...(defaultExpandedId ? { [defaultExpandedId]: true } : {}),
    });
    const { palette, spacing } = useTheme();

    const handleChange =
        (id: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(
                allowMultiExpand
                    ? { ...expanded, [id]: newExpanded }
                    : { [id]: newExpanded }
            );
        };

    return (
        <List withItemSeparator={withDividers}>
            {items.map(({ id, header, body }) => (
                <MuiAccordion
                    disableGutters
                    elevation={0}
                    key={id}
                    expanded={expanded[id] ?? false}
                    onChange={handleChange(id)}
                    style={{
                        padding: 0,
                    }}
                >
                    <AccordionSummary
                        aria-controls={`${id}-content`}
                        id={`${id}-accordion-header`}
                        style={{
                            padding: 0,
                            paddingTop: spacing(3),
                            paddingBottom: spacing(3),
                        }}
                    >
                        {typeof header === 'string' ? (
                            <Paragraph
                                data-testid={TEST_IDS.BODY_TEXT}
                                size={PARAGRAPH_SIZE.MEDIUM}
                                fontWeight={PARAGRAPH_FONT_WEIGHT.BOLD}
                                style={{ padding: 0, margin: 0 }}
                            >
                                {header}
                            </Paragraph>
                        ) : (
                            header
                        )}
                    </AccordionSummary>
                    <MuiAccordionDetails
                        style={{
                            padding: 0,
                            paddingBottom: spacing(3),
                        }}
                    >
                        {typeof body === 'string' ? (
                            <Paragraph
                                data-testid={`${TEST_IDS.BODY_TEXT}-${id}${
                                    expanded[id] ? '-expanded' : ''
                                }`}
                                size={PARAGRAPH_SIZE.SMALL}
                                style={{
                                    margin: 0,
                                    color: palette.text.secondary,
                                }}
                            >
                                {body}
                            </Paragraph>
                        ) : (
                            body
                        )}
                    </MuiAccordionDetails>
                </MuiAccordion>
            ))}
        </List>
    );
};

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<KeyboardArrowDownSharpIcon />}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
        marginRight: theme.spacing(4),
    },
}));
