import React from "react";
import FirstUseCaseComponent, {
    FirstUseCaseComponentRef,
} from "./FirstUseCaseComponent";
import SecondUseCaseComponent from "./SecondUseCaseComponent";
import "./TestUseImperativeHandle.css";

const TestUseImperativeHandle = () => {
    const firstUseCaseComponentRef =
        React.useRef<FirstUseCaseComponentRef>(null);
    const secondUseCaseComponentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const bodyCurrent = firstUseCaseComponentRef.current?.bodyCurrent;
        const leftCurrent = firstUseCaseComponentRef.current?.leftCurrent;
        const rightCurrent = firstUseCaseComponentRef.current?.rightCurrent;
        const onLeftClick = () => {
            window.alert(
                "FirstUseCaseComponent: onLeftClick using ref from outside the component"
            );
        };
        const onRightClick = () => {
            window.alert(
                "SecondUseCaseComponent: onRightClick using ref from outside the component"
            );
        };
        if (bodyCurrent) {
            console.log(
                "clientWidth get using div ref from outside the component FirstUseCaseComponent: ",
                bodyCurrent.clientWidth
            );
        }
        leftCurrent?.addEventListener("click", onLeftClick);
        rightCurrent?.addEventListener("click", onRightClick);
        return () => {
            leftCurrent?.removeEventListener("click", onLeftClick);
            rightCurrent?.removeEventListener("click", onRightClick);
        };
    });

    React.useEffect(() => {
        const current = secondUseCaseComponentRef.current; // The ref value 'secondUseCaseComponentRef.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'secondUseCaseComponentRef.current' to a variable inside the effect, and use that variable in the cleanup function.
        const onClick = () => {
            window.alert(
                "SecondUseCaseComponent: onClick using ref from outside the component"
            );
        };
        if (current) {
            current.addEventListener("click", onClick);
            console.log(
                "clientWidth get using ref from outside the component SecondUseCaseComponent: ",
                current.clientWidth
            );
        }
        return () => {
            current?.removeEventListener("click", onClick);
        };
    });

    return (
        <div className={TestUseImperativeHandle.name}>
            <h2>UseImperativeHandle</h2>
            <div>
                <h3>
                    1st use case:{" "}
                    <div className="normal-text">
                        Create custom <code>current.target</code> to be passed
                        as a <code>ref</code> for parent React components.
                    </div>
                </h3>
                <FirstUseCaseComponent ref={firstUseCaseComponentRef} />
                <div className="spaced">
                    Interacting from outside:
                    <button
                        onClick={() =>
                            firstUseCaseComponentRef.current?.focus?.()
                        }
                    >
                        Focus on 1st Input
                    </button>
                    <button
                        onClick={() =>
                            firstUseCaseComponentRef.current?.focus2ndInput?.()
                        }
                    >
                        Focus on 2nd Input
                    </button>
                </div>
            </div>
            <div>
                <h3>
                    2nd use case:
                    <div className="normal-text">
                        Offer a <code>ref</code> for parent React components
                        while handling the same <code>ref</code> inside our
                        component implementation
                    </div>
                </h3>
                <SecondUseCaseComponent ref={secondUseCaseComponentRef} />
            </div>
        </div>
    );
};

export default TestUseImperativeHandle;
