import React from "react";

const ModalExample = (props: { useLayoutHook: boolean }) => {
	const [show, setShow] = React.useState<boolean>(false);
	const popup = React.useRef<HTMLDivElement>(null);
	const button = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		// essential to show our popup flickering when using `useEffect()` to modify the layout
		// In React v18, `useEffect()` **won't** run async when it is as a result of discrete user input. So, the problem is partially solved. We'll only get flicks when `useEffect()` is triggered programmatically (for example, via `setTimeout` inside an `useEffect()`)
		setTimeout(() => {
			setShow(true);
		}, 500);
	}, []);
	React.useEffect(() => {
		if (props.useLayoutHook) return;
		console.log(`${ModalExample.name} useEffect`);
		if (popup.current === null || button.current === null) return;
		const { bottom } = button.current.getBoundingClientRect();
		for (let index = 0; index < 1000000000; index++) {}
		popup.current.style.top = `${bottom + 25}px`;
	}, [show, props.useLayoutHook]);
	React.useLayoutEffect(() => {
		if (!props.useLayoutHook) return;
		console.log(`${ModalExample.name} useLayoutEffect`);
		if (popup.current === null || button.current === null) return;
		const { bottom } = button.current.getBoundingClientRect();
		for (let index = 0; index < 1000000000; index++) {}
		popup.current.style.top = `${bottom + 35}px`;
	}, [show, props.useLayoutHook]);

	return (
		<div className={ModalExample.name}>
			<button
				ref={button}
				onClick={() => {
					setShow((prev) => !prev);
				}}
			>
				Click Here
			</button>
			{show && (
				<div ref={popup} style={{ position: "absolute" }}>
					This is a popup
				</div>
			)}
		</div>
	);
};

const TestUseLayoutEffect = () => {
	const [count, setCount] = React.useState(0);

	console.log(`React render method (1): ${count}`);
	React.useLayoutEffect(() => {
		console.log(`React.useLayoutEffect (1): ${count}`);
	}, [count]);
	React.useEffect(() => {
		console.log(`React.useEffect (1): ${count}`);
	}, [count]);
	React.useEffect(() => {
		console.log(`React.useEffect (2): ${count}`);
	}, [count]);
	React.useLayoutEffect(() => {
		console.log(`React.useLayoutEffect (2): ${count}`);
	}, [count]);
	console.log(`React render method (2): ${count}`);

	return (
		<div className={TestUseLayoutEffect.name}>
			<p>
				Button to test the order of execution of{" "}
				<code>React.useEffect</code> and{" "}
				<code>React.useLayoutEffect</code> (see the prints with{" "}
				<code>console.log</code>).
			</p>
			<button
				onClick={() => {
					setCount((prev) => ++prev);
				}}
			>
				Increment
			</button>
			<div>{count}</div>
			<div>
				<p>
					Test of visual flickering by the usage of{" "}
					<code>useEffect</code> to manipulate DOM layout
				</p>
				<p>
					(<code>setTimeout</code> of <code>500ms</code> at the
					initial render shows us the flickering)
				</p>
				<div>
					<p>With useEffect: </p>
					<ModalExample useLayoutHook={false} />
				</div>
				<div style={{ paddingTop: "60px" }}>
					<p>With useLayoutEffect: </p>
					<ModalExample useLayoutHook={true} />
				</div>
			</div>
		</div>
	);
};

export default TestUseLayoutEffect;
