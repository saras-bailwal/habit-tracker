import { Box, createTheme, CssBaseline, IconButton, ThemeProvider, useTheme } from "@mui/material";
import React from "react";
import darkTheme from "@/app/theme/darkTheme";
import lightTheme from "@/app/theme/lightTheme";
import Header from "@/app/components/Header";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from "@/app/store/features/store";
import SideMenu from "@/app/components/SideMenu";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = ({
    Component, pageProps: {...pageProps}
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
          [],
        );
        const lightThemeChosen = React.useMemo(
            () =>
                createTheme({
                    ...lightTheme,
                }),
            [],
        ); 
    return (
        <Provider store={store}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}>
                        <CssBaseline />
                        <Header ColorModeContext={ColorModeContext}/>
                            <SideMenu />
                            <Component {...pageProps} />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Provider>
    )
}

export default App;