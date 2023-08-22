import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";
import errorMapping from "../Utils/errorMapping";

const Signup = ({ handleClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { theme } = useTheme();


    const handleSubmit = () => {
        if (!username || !email || !password || !confirmPassword) {
            toast.warning('Please fill all details', {
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

        if (password !== confirmPassword) {
            toast.warning('Password mismatched', {
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

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                toast.success('User added successfully', {
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
                return updateProfile(userCredentials.user, { displayName: username });
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
                })
            })
    }

    return (
        <Box className="signup-form" p={3} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
                type="text"
                variant="outlined"
                label="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: theme.textBoxColor } }}
                InputProps={{ style: { color: theme.color } }}
            />

            <TextField
                type="email"
                variant="outlined"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <TextField
                type="password"
                variant="outlined"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{ style: { color: theme.textBoxColor } }}
                InputProps={{ style: { color: theme.color } }}
            />

            <Button
                variant="contained"
                size='large'
                style={{ background: theme.textBoxColor, color: theme.color }}
                onClick={handleSubmit}
            >
                Signup
            </Button>
        </Box>
    )
}

export default Signup;