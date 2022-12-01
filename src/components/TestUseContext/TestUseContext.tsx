import React from "react";
import ActiveThemedButton from "./ActiveThemedButton";
import PassiveThemedButton from "./PassiveThemedButton";
import "./TestUseContext.css";
import { Theme, ThemeContext } from "./ThemeContext";
import { ThemePlusSetterContextProvider } from "./ThemePlusSetterContext";
import themes from "./themes";

const IntermediaryComponentForPassiveButton = () => (
    <div className={IntermediaryComponentForPassiveButton.name}>
        <PassiveThemedButton />
    </div>
);
const IntermediaryComponentForActiveButton = () => {
    return (
        <div className={IntermediaryComponentForActiveButton.name}>
            <ActiveThemedButton />
        </div>
    );
};

const TestUseContext = () => {
    const [theme, setTheme] = React.useState<Theme>(themes.dark);

    return (
        <div className={TestUseContext.name}>
            <h2>{TestUseContext.name}</h2>
            <div>
                <h3>Context without setter</h3>
                <div>
                    Nested button relies on the parent component that offers the
                    context to change the context's value:
                </div>
                <ThemeContext.Provider value={theme}>
                    <IntermediaryComponentForPassiveButton />
                </ThemeContext.Provider>
                <button
                    onClick={() => {
                        setTheme(
                            theme.foreground === themes.light.foreground
                                ? themes.dark
                                : themes.light
                        );
                    }}
                >
                    Parent's component "Change theme" button
                </button>
            </div>
            <div>
                <h3>Context with setter</h3>
                <div>
                    <div>
                        Nested button can change the value inside the context:
                    </div>
                    <ThemePlusSetterContextProvider>
                        <IntermediaryComponentForActiveButton />
                    </ThemePlusSetterContextProvider>
                </div>
            </div>
        </div>
    );
};

export { TestUseContext as default };
