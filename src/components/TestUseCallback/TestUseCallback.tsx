import React, { useCallback, useEffect, useState } from "react";

const ListNumbers = (props: {
	isUsingUseCallback: boolean;
	getNumbers: (n: number) => number[];
}) => {
	const [numbers, setNumbers] = useState<number[]>([]);
	const usageOfUseCallbackStatus = props.isUsingUseCallback
		? "(with UseCallback)"
		: "(without UseCallback)";
	//console.log(`${ListNumbers.name} ${usageOfUseCallbackStatus} was rendered`);
	useEffect(() => {
		console.log(
			`${ListNumbers.name} useEffect ${usageOfUseCallbackStatus} was fired`
		);
		setNumbers(props.getNumbers(2));
	}, [props.getNumbers, props.isUsingUseCallback]);
	return (
		<div className={ListNumbers.name}>
			<h3>{usageOfUseCallbackStatus}</h3>
			<ul>
				{numbers.map((n) => (
					<li key={n}>{n}</li>
				))}
			</ul>
		</div>
	);
};

const TestUseCallback = () => {
	const [increment, setIncrement] = useState<number>(2);
	const [unimportantBooleanState, setUnimportantBooleanState] =
		React.useState<boolean>(false);

	const themeStyles = {
		backgroundColor: unimportantBooleanState ? "black" : "white",
		color: unimportantBooleanState ? "white" : "black",
	};

	const getNumbersWithoutMemo = (num: number) => [
		num,
		num + increment,
		num + increment * 2,
	];
	const getNumbers = useCallback(
		(num: number) => [num, num + increment, num + increment * 2],
		[increment]
	);

	return (
		<div className={TestUseCallback.name} style={themeStyles}>
			<h2>UseCallback</h2>
			<div>
				<div>
					<label>
						Incrementer:
						<input
							type="number"
							value={increment}
							onChange={(e) => {
								setIncrement(Number(e.target.value));
							}}
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
				<ListNumbers
					getNumbers={getNumbers}
					isUsingUseCallback={true}
				/>
				<ListNumbers
					getNumbers={getNumbersWithoutMemo}
					isUsingUseCallback={false}
				/>
			</div>
		</div>
	);
};

export default TestUseCallback;
