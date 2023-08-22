import React from "react";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Account from "./Account";

const Header = () => {
    return(
        <div className="header">
            <div className="logo">
                <KeyboardIcon style={{fontSize: "2rem"}} />
                TYPING-GEEK
            </div>
            <Account />
        </div>
    )
}

export default Header;