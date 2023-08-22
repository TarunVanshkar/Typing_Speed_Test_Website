import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/FirebaseConfig';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UserInfo = ({ totalTestTaken }) => {
    const [user] = useAuthState(auth);
    // console.log("user in userinfo", user);
    // console.log(totalTestTaken)
    // console.log(user)

    return (
        <div className='user'>
            <div className='user-info'>
                <div className='picture'>
                    {
                        user.photoURL ? <img src={user.photoURL} alt='user-img' className='user-img' />
                            :
                            <AccountCircleRoundedIcon style={{ transform: 'Scale(5)', display: 'block', margin: 'auto', marginBottom: '3.5rem' }} />
                    }
                </div>
                <div className='user-details'>
                    <p>Name: <b>{user.displayName}</b></p>
                    <p>Email: <b>{user.email}</b></p>
                    <p>Account Created: <b>{user.metadata.creationTime}</b></p>
                    <p>Last Login: <b>{user.metadata.lastSignInTime}</b></p>
                </div>
            </div>
            <div className='test-details'>
                <p>Total Tests Taken: <b>{totalTestTaken}</b></p>
            </div>
        </div>
    )
}

export default UserInfo;