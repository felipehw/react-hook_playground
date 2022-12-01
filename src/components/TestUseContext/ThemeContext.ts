import React from "react";
import themes from "./themes";

export interface Theme {
    background: string;
    foreground: string;
}

const ThemeContext = React.createContext<Theme>(themes.light);

export { ThemeContext };
