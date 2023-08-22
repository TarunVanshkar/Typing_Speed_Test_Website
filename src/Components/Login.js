import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";
import errorMapping from "../Utils/errorMapping";

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();

    const handleSubmit = () => {
        if (!email || !password) {
            toast.warning('Please fill all the details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                toast.success('LoggedIn Successfully', {
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
    return (
        <Box className="login-form" p={2} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: theme.textBoxColor } }}
                InputProps={{ style: { color: theme.color } }}
            />

            <TextField
                type="password"
                variant="outlined"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: theme.textBoxColor } }}
                InputProps={{ style: { color: theme.color } }}
            />

            <Button
                variant="contained"
                size='large'
                style={{ background: theme.textBoxColor, color: theme.color }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    )
}

export default Login;