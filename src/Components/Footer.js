import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Select from 'react-select';
import { ThemeOptions } from "../Utils/ThemeOptions";
import { useTheme } from "../Context/ThemeContext";

const Footer = () => {
    const { theme, setTheme, defaultTheme } = useTheme();
    const handleThemeChange = (e) => {
        localStorage.setItem('theme', JSON.stringify(e.value));
        setTheme(e.value);
    };

    return (
        <div className="footer">
            <div className="links-container">
                <a href="https://github.com/TarunVanshkar" target="_blank" >
                    <GitHubIcon />
                </a>
                <a href="https://github.com/TarunVanshkar" target="_blank" >
                    <LinkedInIcon />
                </a>
            </div>

            <div className="themes">
                Select Theme:
                <Select
                    options={ThemeOptions}
                    value={theme}
                    onChange={handleThemeChange}
                    menuPlacement='top'
                    defaultValue={{ value: defaultTheme, label: defaultTheme.label }}
                    styles={{
                        control: styles => ({ ...styles, backgroundColor: theme.background }),
                        menu: styles => ({ ...styles, backgroundColor: theme.background }),
                        option: (styles, { isFocused }) => {
                            return {
                                ...styles,
                                backgroundColor: (isFocused) ? theme.background : theme.color,
                                color: (isFocused) ? theme.color : theme.textBoxColor,
                                cursor: 'pointer'
                            }
                        },
                        singleValue: styles => ({ ...styles, color: theme.color }),
                    }}
                />
            </div>
        </div>
    )
}

export default Footer;