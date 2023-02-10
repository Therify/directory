type AbstractShapeProps = Omit<
    React.ComponentPropsWithoutRef<'img'>,
    'src' | 'alt'
>;

const SHAPE_ONE =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673455675/app.therify.co/shapes/abstract-shape_fbvcil.svg';
const SHAPE_TWO =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673780841/app.therify.co/shapes/abstract-shape-2_gpsoo3.svg';
const SHAPE_THREE =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673780841/app.therify.co/shapes/abstract-shape-3_ti6ibj.svg';

export const AbstractShape1 = (props: AbstractShapeProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SHAPE_ONE} alt="Abstract shape #1" {...props} />
);
export const AbstractShape2 = (props: AbstractShapeProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SHAPE_TWO} alt="Abstract shape #2" {...props} />
);
export const AbstractShape3 = (props: AbstractShapeProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SHAPE_THREE} alt="Abstract shape #3" {...props} />
);
