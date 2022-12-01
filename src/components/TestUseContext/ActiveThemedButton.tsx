import React from "react";
import { ThemePlusSetterContext } from "./ThemePlusSetterContext";
import themes from "./themes";

const ActiveThemedButton = () => {
    const { theme, setTheme } = React.useContext(ThemePlusSetterContext);
    return (
        <button
            className={ActiveThemedButton.name}
            style={{ background: theme.background, color: theme.foreground }}
            onClick={() => {
                setTheme(
                    theme.foreground === themes.light.foreground
                        ? themes.dark
                        : themes.light
                );
            }}
        >
            Active Themed Button (<em>context has setter</em>)
        </button>
    );
};

export default ActiveThemedButton;
