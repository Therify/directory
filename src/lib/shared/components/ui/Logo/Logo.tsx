type LogoProps = Omit<React.ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;

export const TherifyLogo = (props: LogoProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/assets/therify-logo.svg" alt="Therify, Inc logo" {...props} />
);
export const TherifyIcon = (props: LogoProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/assets/therify-icon.svg" alt="Therify, Inc icon" {...props} />
);
