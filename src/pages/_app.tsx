import { Box, createTheme, CssBaseline, IconButton, ThemeProvider, useTheme } from "@mui/material";
import React from "react";
import darkTheme from "@/app/theme/darkTheme";
import lightTheme from "@/app/theme/lightTheme";
import Header from "@/app/components/Header";
import { AppProps } from 'next/app';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = ({
    Component, pageProps: {session, ...pageProps}
}: AppProps) => {
        const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
        const colorMode = React.useMemo(
          () => ({
            toggleColorMode: () => {
              setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
          }),
          [],
        );
      
        const darkThemeChosen = React.useMemo(
          () =>
            createTheme({
                ...darkTheme,
            }),
          [mode],
        );
        const lightThemeChosen = React.useMemo(
            () =>
                createTheme({
                    ...lightTheme,
                }),
            [mode],
        ); 
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}>
                    <CssBaseline />
                    <Header ColorModeContext={ColorModeContext}/>
                        <Component {...pageProps} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;