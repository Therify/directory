import { createTheme } from '@mui/material/styles';

import { components } from './components';
import { palette } from './palette';
import { shape } from './shape';
import { spacing } from './spacing';
import { typography } from './typography';

export * as colors from './colors';

export const therifyDesignSystem = createTheme({
    typography,
    spacing,
    palette,
    components,
    shape,
});
