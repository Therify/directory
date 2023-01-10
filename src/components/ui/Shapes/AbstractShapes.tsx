import shape1 from './assets/abstract-shape-1.svg';
import shape2 from './assets/abstract-shape-2.svg';
import shape3 from './assets/abstract-shape-3.svg';

type AbstractShapeProps = Omit<
    React.ComponentPropsWithoutRef<'img'>,
    'src' | 'alt'
>;

export const AbstractShape1 = (props: AbstractShapeProps) => (
    <img src={shape1} alt="Abstract shape #1" {...props} />
);
export const AbstractShape2 = (props: AbstractShapeProps) => (
    <img src={shape2} alt="Abstract shape #2" {...props} />
);
export const AbstractShape3 = (props: AbstractShapeProps) => (
    <img src={shape3} alt="Abstract shape #3" {...props} />
);
