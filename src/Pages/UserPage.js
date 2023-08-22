import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/FirebaseConfig";
import { useTheme } from "../Context/ThemeContext";
import { CircularProgress } from "@mui/material";
import UserInfo from "../Components/UserInfo";
import Graph from "../Components/Graph";
import UserTable from "../Components/UserTable";

const UserPage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [wpmData, setWpmData] = useState();
    const [accuracyData, setAccuracyData] = useState();
    const [dataLength, setDataLength] = useState(0);

    const [user, loading] = useAuthState(auth);
    const [dataLoading, setDataLoading] = useState(true);

    const { theme } = useTheme();

    const fetchUserData = () => {
        const { uid } = auth.currentUser;
        const resultsRef = db.collection('test-results');
        // console.log(uid);
        // console.log(resultsRef);

        let tempData = [];
        let tempWpmData = [];
        let tempAccuracyData = [];

        resultsRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot) => {
            // console.log(snapshot)
            snapshot.docs.forEach((doc) => {
                // console.log('working', doc);
                tempData.push(doc.data());
                setDataLength(tempData.length)
                tempWpmData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm]);
                tempAccuracyData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().accuracy]);
            })
        });
        // console.log(tempData);
        // console.log(tempAccuracyData);
        // console.log(tempWpmData);
        setData(tempData.reverse());
        setWpmData(tempWpmData);
        setAccuracyData(tempAccuracyData);
        setDataLoading(false);
    }

    useEffect(() => {
        if(!loading && user){
            fetchUserData();
        }

        if(!loading && !user){
            navigate("/");
        }
    },[loading])

    if(loading || dataLoading){
        return(
            <div className="loader">
                <CircularProgress
                    size={300}
                    sx={{
                        color: theme.color
                    }}
                />
            </div>
        )
    };

    // console.log(data)
    return(
        <div className="user-container">
            <UserInfo totalTestTaken={dataLength} />
            {
                dataLength === 0 ? (
                    ""
                ) : (
                    <>
                        <div className="user-graph">
                            <Graph wpmData={wpmData} accuracyData={accuracyData} />
                        </div>
                        <UserTable data={data} />
                    </>
                )
            }
        </div>
    )
}

export default UserPage;