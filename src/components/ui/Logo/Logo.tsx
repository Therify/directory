type LogoProps = Omit<React.ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;

export const TherifyLogo = (props: LogoProps) => (
    <img src="/assets/therify-logo.svg" alt="Therify, Inc logo" {...props} />
);
export const TherifyIcon = (props: LogoProps) => (
    <img src="/assets/therify-icon.svg" alt="Therify, Inc icon" {...props} />
);
