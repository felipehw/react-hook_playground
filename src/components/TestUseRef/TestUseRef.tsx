import React from "react";

const TestUseRef = () => {
	const [value, setValue] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);
	const previousValue = React.useRef<string>();

	const focusOnInput = () => inputRef.current?.focus();

	React.useEffect(() => {
		previousValue.current = value; // (In reality, the `ref` variable will have the updated value but it won't fire a re-render, so the render will show to the user an old — the previous — version.)
		console.log(previousValue.current); // updated value
	}, [value]);

	return (
		<div className="TestUseRef">
			<h2>UseRef</h2>
			<input
				type="text"
				title="input"
				ref={inputRef}
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
			/>
			<p>The previous value is {previousValue.current}</p>
			{/* The variable `previousValue.current` — in reality — has the most recent value, but it'll show here the previous value because its update doesn't trigger a re-render */}
			<button onClick={focusOnInput}>Focus over input</button>
		</div>
	);
};

export default TestUseRef;
