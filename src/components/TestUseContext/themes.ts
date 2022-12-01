import { Theme } from "./ThemeContext";

const themes: { [key: string]: Theme } = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

export default themes;
