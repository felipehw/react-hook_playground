import React, { ForwardedRef } from "react";

export type FirstUseCaseComponentRef = {
    // Passing elements nested inside `ref.current`
    bodyCurrent: HTMLDivElement;
    rightCurrent: HTMLButtonElement;
    leftCurrent: HTMLButtonElement;
    // Simulating customized API of `ref.current`
    focus: ((options?: FocusOptions) => void) | undefined;
    focus2ndInput: ((options?: FocusOptions) => void) | undefined;
} | null;
type PropTypes = {};
const defaultProps = {};
const FirstUseCaseComponentRender = (
    props: PropTypes,
    ref: ForwardedRef<FirstUseCaseComponentRef>
) => {
    props = { ...defaultProps, ...props };
    const innerBodyRef = React.useRef<HTMLDivElement>(null);
    const innerLeftRef = React.useRef<HTMLButtonElement>(null);
    const innerRightRef = React.useRef<HTMLButtonElement>(null);
    const innerInput1Ref = React.useRef<HTMLInputElement>(null);
    const innerInput2Ref = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => {
        return {
            // Passing elements nested inside `ref.current`
            rightCurrent: innerRightRef.current as HTMLButtonElement,
            leftCurrent: innerLeftRef.current as HTMLButtonElement,
            bodyCurrent: innerBodyRef.current as HTMLDivElement,
            // Simulating customized API of `ref.current`
            focus: (...args) => innerInput1Ref.current?.focus(...args),
            focus2ndInput: (...args) => innerInput2Ref.current?.focus(...args),
        };
    });

    React.useEffect(() => {
        const divCurrent = innerBodyRef.current;
        const leftCurrent = innerLeftRef.current;
        const rightCurrent = innerRightRef.current;
        const onLeftClick = () => {
            window.alert(
                "FirstUseCaseComponent: onLeftClick using ref from inside the component"
            );
        };
        const onRightClick = () => {
            window.alert(
                "FirstUseCaseComponent: onRightClick using ref from inside the component"
            );
        };
        if (divCurrent) {
            console.log(
                "clientWidth get using div ref from inside the component FirstUseCaseComponent: ",
                divCurrent.clientWidth
            );
        }
        leftCurrent?.addEventListener("click", onLeftClick);
        rightCurrent?.addEventListener("click", onRightClick);
        return () => {
            leftCurrent?.removeEventListener("click", onLeftClick);
            rightCurrent?.removeEventListener("click", onRightClick);
        };
    });

    return (
        <div ref={innerBodyRef} className={FirstUseCaseComponentRender.name}>
            <h4>FirstUseCaseComponent</h4>
            <div>
                <button ref={innerLeftRef}>Button Left</button>
                <button ref={innerRightRef}>Button Right</button>
            </div>
            <div>
                <label>
                    1st Input: <input ref={innerInput1Ref} type="text" />
                </label>
                <label>
                    2nd Input:
                    <input ref={innerInput2Ref} type="text" />
                </label>
            </div>
        </div>
    );
};
const FirstUseCaseComponent = React.forwardRef<
    FirstUseCaseComponentRef,
    PropTypes
>(FirstUseCaseComponentRender);

export default FirstUseCaseComponent;
