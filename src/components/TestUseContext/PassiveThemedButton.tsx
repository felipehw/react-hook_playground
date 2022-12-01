import React from "react";
import { ThemeContext } from "./ThemeContext";

const PassiveThemedButton = () => {
    const theme = React.useContext(ThemeContext);
    return (
        <button
            className={PassiveThemedButton.name}
            style={{ background: theme.background, color: theme.foreground }}
            onClick={() => {
                window.alert("Hi");
            }}
        >
            Passive Themed Button (<em>context doesn't has setter</em>)
        </button>
    );
};

export default PassiveThemedButton;
