import TherifyLogoSvg from './assets/therify-logo.svg';
import TherifyIconSvg from './assets/therify-icon.svg';

type LogoProps = Omit<React.ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;

export const TherifyLogo = (props: LogoProps) => (
    <img src={TherifyLogoSvg} alt="Therify, Inc logo" {...props} />
);
export const TherifyIcon = (props: LogoProps) => (
    <img src={TherifyIconSvg} alt="Therify, Inc icon" {...props} />
);
