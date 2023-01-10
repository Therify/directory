import { TypographyProps, Typography as MuiTypography } from '@mui/material';

export const MuiH1 = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="h1" {...props}>
        {children}
    </MuiTypography>
);
export const MuiH2 = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="h2" {...props}>
        {children}
    </MuiTypography>
);
export const MuiH3 = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="h3" {...props}>
        {children}
    </MuiTypography>
);
export const MuiH4 = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="h4" {...props}>
        {children}
    </MuiTypography>
);
export const MuiH5 = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="h5" {...props}>
        {children}
    </MuiTypography>
);
export const MuiH6 = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="h6" {...props}>
        {children}
    </MuiTypography>
);
export const MuiParagraph = ({ children, ...props }: TypographyProps) => (
    <MuiTypography paragraph {...props}>
        {children}
    </MuiTypography>
);
export const MuiSpan = ({ children, ...props }: TypographyProps) => (
    <MuiTypography variant="body1" component="span" {...props}>
        {children}
    </MuiTypography>
);
