import React, { createContext, useContext, useState } from "react";
import { ThemeOptions } from "../Utils/ThemeOptions";

const ThemeContext = React.createContext();

export const ThemeContextProvider = ({children}) => {
    const defaultTheme = JSON.parse(localStorage.getItem('theme')) || ThemeOptions[0].value;
    const [theme, setTheme] = useState(defaultTheme);

    return(
        <ThemeContext.Provider value={{theme, setTheme, defaultTheme}}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);