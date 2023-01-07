import { createTheme } from '@mui/material/styles';
import { COMPONENTS } from './components';
import { LIGHT_PALETTE } from './palette';
import { SHAPE } from './shape';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typograhy';

export const THERIFY_THEME = createTheme({
    palette: LIGHT_PALETTE,
    typography: TYPOGRAPHY,
    components: COMPONENTS,
    spacing: SPACING,
    shape: SHAPE,
});
