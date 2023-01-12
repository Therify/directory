const THERIFY_LOGO_URL =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673472296/app.therify.co/logo/therify-logo_e45lbl.svg' as const;
const THERIFY_ICON_URL =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673472296/app.therify.co/logo/therify-icon_rczawj.svg' as const;

type LogoProps = Omit<React.ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;

export const TherifyLogo = (props: LogoProps) => (
    <img src={THERIFY_LOGO_URL} alt="Therify, Inc logo" {...props} />
);
export const TherifyIcon = (props: LogoProps) => (
    <img src={THERIFY_ICON_URL} alt="Therify, Inc icon" {...props} />
);
