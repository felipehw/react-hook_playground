import React from "react";
import TestUseMemo from "../TestUseMemo/TestUseMemo";

const TestUseEffect = () => {
	const [resourceType, setResourceType] = React.useState<string>("posts");
	const ref = React.useRef(0);

	let normalPrimitiveVariable: number = 0;
	let normalObjectVariable: Object = {};

	React.useEffect(() => {
		console.log("Run on every render, after the render method");
	});
	React.useEffect(() => {
		console.log("Run when `normalPrimitiveVariable` changes");
	}, [normalPrimitiveVariable]);
	React.useEffect(() => {
		console.log("Run when `normalObjectVariable` changes");
	}, [normalObjectVariable]);
	React.useEffect(() => {
		console.log("Run when `ref` changes");
	}, [ref.current]);
	React.useEffect(() => {
		console.log("Run when `resourceType` changes");
	}, [resourceType]);

	const [innerWidth, setInnerWidth] = React.useState<number>(
		window.innerWidth
	);
	React.useEffect(() => {
		const updateInnerWidthInfo = () => {
			setInnerWidth(window.innerWidth);
		};
		window.addEventListener("resize", updateInnerWidthInfo);
		return () => {
			window.removeEventListener("resize", updateInnerWidthInfo);
		};
	}, []);

	console.log(
		`The corpus of a Functional Component.
		It works like a render() method in Class Components.
		It runs **before** useEffect hooks`
	);

	return (
		<div className={TestUseMemo.name}>
			<h2>UseEffect</h2>
			<p>Inner Width: {innerWidth}</p>
			<div>
				<button
					onClick={() => {
						setResourceType("posts");
					}}
				>
					Posts
				</button>
				<button
					onClick={() => {
						setResourceType("users");
					}}
				>
					Users
				</button>
				<button
					onClick={() => {
						setResourceType("comments");
					}}
				>
					Comments
				</button>
			</div>
			<h3>{resourceType}</h3>
			<div>
				<h3>Normal Primitive Variable: {normalPrimitiveVariable}</h3>
				<div>
					<button
						onClick={() => {
							normalPrimitiveVariable++;
							console.log(normalPrimitiveVariable);
						}}
					>
						Change <em>normalPrimitiveVariable</em>
					</button>
				</div>
			</div>
			<div>
				<h3>
					Normal Object Variable:{" "}
					{JSON.stringify(normalObjectVariable)}
				</h3>
				<div>
					<button
						onClick={() => {
							normalObjectVariable = {};
							console.log(normalObjectVariable);
						}}
					>
						Change <em>normalObjectVariable</em>
					</button>
				</div>
			</div>
			<div>
				<h3>Ref Variable: {ref.current}</h3>
				<div>
					<button
						onClick={() => {
							ref.current++;
							console.log(ref.current);
						}}
					>
						Change <em>ref variable</em>
					</button>
				</div>
			</div>
		</div>
	);
};

export default TestUseEffect;
