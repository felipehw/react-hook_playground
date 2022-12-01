import React, { ReactNode } from "react";
import { Theme } from "./ThemeContext";
import themes from "./themes";

export interface ThemePlusSetter {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemePlusSetterContext = React.createContext<ThemePlusSetter>(
    {} as ThemePlusSetter
);
const ThemePlusSetterContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [theme, setTheme] = React.useState<Theme>(themes.dark);
    return (
        <ThemePlusSetterContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemePlusSetterContext.Provider>
    );
};

export { ThemePlusSetterContext, ThemePlusSetterContextProvider };
