import { ReactNode, useCallback, useEffect, useState } from 'react';

import Grid, { GridProps } from '@mui/material/Grid';

const TEST_IDS = {
    PICKER_PARENT: 'picker-parent',
    PICKER_ITEM: 'picker-item',
};

export interface IPickable {
    id: string;
    [key: string]: ReactNode;
}

export interface IPickerProps<T extends IPickable = IPickable> {
    item: T;
    handleSelected: (item: T['id']) => void;
    isSelected: boolean;
}

export type PickerProps = {
    items: IPickable[];
    onSelectionUpdated: (selectedItems: string[]) => void;
    renderCard: (props: IPickerProps) => JSX.Element;
    multiSelect?: boolean;
} & GridProps;

export function Picker({
    onSelectionUpdated,
    items,
    renderCard,
    multiSelect = false,
    ...props
}: PickerProps) {
    const [selected, setSelected] = useState<{
        [key: IPickable['id']]: boolean;
    }>({});
    useEffect(() => {
        const ALL_SELECTED = Object.entries(selected)
            .filter(([, isSelected]) => isSelected)
            .map(([id]) => id);
        onSelectionUpdated(ALL_SELECTED);
    }, [selected, onSelectionUpdated]);
    const handleSelected = useCallback(
        (itemId: string) => {
            setSelected((draft) => {
                if (multiSelect) {
                    const isSelected = draft[itemId];
                    if (isSelected) {
                        const { [itemId]: item, ...rest } = draft;
                        delete rest[itemId];
                        return rest;
                    }
                    return {
                        ...draft,
                        [itemId]: true,
                    };
                }
                if (draft[itemId]) return {};
                // select this one
                return {
                    [itemId]: true,
                };
            });
        },
        [setSelected, multiSelect]
    );
    return (
        <Grid data-testid={TEST_IDS.PICKER_PARENT} {...props}>
            {items.map((item) =>
                renderCard({
                    item,
                    handleSelected,
                    isSelected: selected[item.id],
                })
            )}
        </Grid>
    );
}
