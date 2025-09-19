import { ThemeProvider as Theme, theme, ColorModeProvider } from "@chakra-ui/react";
// import { ColorModeProvider } from "@chakra-ui/color-mode";

const ThemeProvider = ({ children }) => {
    return (
        <Theme theme={theme}>
            <ColorModeProvider>{children}</ColorModeProvider>
        </Theme>
    );
};

export default ThemeProvider;
