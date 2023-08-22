import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import Login from "./Login";
import Signup from "./Signup";
import GooogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from "@mui/icons-material/Logout";

const Account = () => {
    const [open, setOpen] = useState(false);   // To open madal to login or signup
    const [value, setValue] = useState(0);   // To check whether login or signup is clicked
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { theme } = useTheme();
    const provider = new GoogleAuthProvider();

    const handleClick = () => {
        if (user) {
            navigate('/user');
        }
        else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e, v) => {
        // console.log(e, v);
        setValue(v);
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success('Google login successfull', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                handleClose();
            })
            .catch((error) => {
                toast.error(errorMapping[error.code] || error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Logged out', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch((error) => {
                toast.error('Unable to logout', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            })
    }

    return (
        <div className="account">
            <div className="account-icons">
                <AccountCircleIcon
                    style={{ fontSize: "2rem" }}
                    onClick={handleClick}
                />
                {
                    user && <LogoutIcon onClick={logout} />
                }
            </div>
            <Modal
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                open={open}
                onClose={handleClose}>
                <Box style={{width: '420px'}}>
                    <AppBar
                        style={{
                            position: 'static',
                            background: theme.background,
                            textAlign: 'center'
                        }}
                    >
                        <Tabs variant="fullWidth" value={value} onChange={handleChange} >
                            <Tab label='Login' style={{ color: theme.color }} />
                            <Tab label='Signup' style={{ color: theme.color }} />
                        </Tabs>
                        {
                            value === 0 ? (
                                <Login handleClose={handleClose} />
                            ) : (
                                <Signup handleClose={handleClose} />
                            )
                        }
                        <Box style={{ padding: '1rem' }}>
                            <span style={{ color: theme.color }}>OR</span>
                            <GooogleButton
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={signInWithGoogle}
                            />
                        </Box>
                    </AppBar>
                </Box>
            </Modal>
        </div>
    )
}

export default Account;