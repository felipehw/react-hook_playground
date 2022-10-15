import React, { useEffect } from "react";

const slowCalculateDouble = (num: number) => {
	for (let index = 0; index < 1000000000; index++) {}
	return num * 2;
};

const DoubleUsingMemoHook = (props: { num: number }) => {
	const memoizedCalculatedDouble = React.useMemo(
		() => slowCalculateDouble(props.num),
		[props.num]
	);
	return <>{memoizedCalculatedDouble}</>;
};
const DoubleWithoutMemoHook = (props: { num: number }) => (
	<>{slowCalculateDouble(props.num)}</>
);

const TestUseMemo = () => {
	const [num, setNum] = React.useState<number>(0);
	const [unimportantBooleanState, setUnimportantBooleanState] =
		React.useState<boolean>(false);
	const [isUseMemoActive, setIsUseMemoActive] =
		React.useState<boolean>(false);

	const themeStyles = {
		backgroundColor: unimportantBooleanState ? "black" : "white",
		color: unimportantBooleanState ? "white" : "black",
	};

	const objWithoutMemoization = { anProperty: unimportantBooleanState };
	const objWithMemoization = React.useMemo(
		() => ({ anProperty: unimportantBooleanState }),
		[unimportantBooleanState]
	);
	useEffect(() => {
		console.log("useEffect of objWithMemoization");
	}, [objWithMemoization]);
	useEffect(() => {
		console.log("useEffect of objWithoutMemoization");
	}, [objWithoutMemoization]);
	useEffect(() => {
		console.log(`useEffect of unimportantBooleanState.`);
	}, [unimportantBooleanState]);

	return (
		<div className={TestUseMemo.name} style={themeStyles}>
			<h2>UseMemo</h2>
			<div>
				<div>
					<label>
						Actual number:{" "}
						<input
							type="number"
							value={num}
							onChange={(e) => {
								setNum(Number(e.target.value));
							}}
						/>
					</label>
				</div>
				<div>
					<label>
						useMemo is Active?{" "}
						<input
							type="checkbox"
							checked={isUseMemoActive}
							onChange={() => setIsUseMemoActive((prev) => !prev)}
						/>
					</label>
				</div>
				<div>
					<label>
						unimportant State (only used to trigger re-render){" "}
						<input
							type="checkbox"
							checked={unimportantBooleanState}
							onChange={() =>
								setUnimportantBooleanState((prev) => !prev)
							}
						/>
					</label>
				</div>
			</div>
			<div>
				{/* First use case: Avoid redo heavy function calculations on each re-render. */}
				{isUseMemoActive ? (
					<p>
						Memoized result: <DoubleUsingMemoHook num={num} />
					</p>
				) : (
					<p>
						Doubled number (Slow result):{" "}
						<DoubleWithoutMemoHook num={num} />
					</p>
				)}
			</div>
		</div>
	);
};

export default TestUseMemo;
