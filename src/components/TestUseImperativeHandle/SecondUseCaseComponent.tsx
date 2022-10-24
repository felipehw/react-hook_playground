import React, { ForwardedRef } from "react";

type Ref = HTMLDivElement;
type PropTypes = {};
const defaultProps = {};
const SecondUseCaseComponentRender = (
    props: PropTypes,
    ref: ForwardedRef<Ref>
) => {
    props = { ...defaultProps, ...props };
    const innerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    React.useEffect(() => {
        const current = innerRef.current; // The ref value 'innerRef.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'innerRef.current' to a variable inside the effect, and use that variable in the cleanup function.
        const onClick = () => {
            window.alert(
                "SecondUseCaseComponent: onClick using ref from inside the component"
            );
        };
        if (current) {
            current.addEventListener("click", onClick);
            console.log(
                "clientWidth get using ref from inside the component SecondUseCaseComponent: ",
                current.clientWidth
            );
        }
        return () => {
            current?.removeEventListener("click", onClick);
        };
    });

    return (
        <div ref={innerRef} className={SecondUseCaseComponentRender.name}>
            <h4>SecondUseCaseComponent</h4>
            <button>Button</button>
        </div>
    );
};
const SecondUseCaseComponent = React.forwardRef<Ref, PropTypes>(
    SecondUseCaseComponentRender
);

export default SecondUseCaseComponent;
