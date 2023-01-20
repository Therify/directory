type AbstractShapeProps = Omit<
    React.ComponentPropsWithoutRef<'img'>,
    'src' | 'alt'
>;

export const AbstractShape1 = (props: AbstractShapeProps) => (
    <img
        src="/assets/abstract-shape-1.svg"
        alt="Abstract shape #1"
        {...props}
    />
);
export const AbstractShape2 = (props: AbstractShapeProps) => (
    <img
        src="/assets/abstract-shape-2.svg"
        alt="Abstract shape #2"
        {...props}
    />
);
export const AbstractShape3 = (props: AbstractShapeProps) => (
    <img
        src="/assets/abstract-shape-3.svg"
        alt="Abstract shape #3"
        {...props}
    />
);
