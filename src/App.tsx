import React, { useState } from "react";
import "./App.css";
import TestUseCallback from "./components/TestUseCallback/TestUseCallback";
import TestUseEffect from "./components/TestUseEffect/TestUseEffect";
import TestUseMemo from "./components/TestUseMemo/TestUseMemo";
import TestUseRef from "./components/TestUseRef/TestUseRef";
import HookTestingItem from "./schemas/HookTestingItem";

function App() {
	const [hooksToTest, setHooksToTest] = useState<HookTestingItem[]>([
		{
			name: TestUseCallback.name,
			component: <TestUseCallback />,
			active: false,
		},
		{
			name: TestUseEffect.name,
			component: <TestUseEffect />,
			active: false,
		},
		{ name: TestUseMemo.name, component: <TestUseMemo />, active: false },
		{ name: TestUseRef.name, component: <TestUseRef />, active: false },
	]);
	const hooksMenuItems = hooksToTest.map((hook, index) => {
		const onChangeHandler = () =>
			setHooksToTest((prev) =>
				prev.map((item) =>
					item.name !== hook.name
						? item
						: { ...hook, active: !hook.active }
				)
			);
		return (
			<li key={hook.name}>
				<label>
					<input
						type="checkbox"
						checked={hook.active}
						onChange={onChangeHandler}
					/>
					{hook.name}
				</label>
			</li>
		);
	});
	return (
		<div className="App">
			<section className="hooks-test">
				<section className="hooks-list-control">
					<h2>Hooks to play:</h2>
					<ul>{hooksMenuItems}</ul>
				</section>
				<section className="hooks-list-playground">
					{hooksToTest
						.filter((hook) => hook.active)
						.map((hook) => (
							<div
								className="hooks-list-playground__item"
								key={hook.name}
							>
								{hook.component}
							</div>
						))}
				</section>
			</section>
		</div>
	);
}

export default App;
