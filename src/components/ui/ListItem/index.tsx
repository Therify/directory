import { Theme, useTheme } from '@mui/material';
import { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export * from './ListItem';
// export const ListItem = ({
//     isLastItem,
//     withBorder,
//     theme,
//     children,
//     style,
// }: PropsWithChildren<{
//     withBorder?: boolean;
//     isLastItem: boolean;
//     theme: Theme;
//     style?: CSSProperties;
// }>) => (
//     <li
//         style={{
//             padding: theme.spacing(7, 0),
//             border: 'none',
//             borderBottom:
//                 withBorder && !isLastItem
//                     ? `1px solid ${theme.palette.divider}`
//                     : 'none',
//             ...style,
//         }}
//     >
//         {children}
//     </li>
// );
