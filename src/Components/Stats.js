import React, { useEffect } from "react";
import { auth, db } from "../Firebase/FirebaseConfig";
import Graph from "./Graph";
import { toast } from 'react-toastify';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useTheme } from "../Context/ThemeContext";

const Stats = (props) => {
    const { setTestEnd, correctChars, incorrectChars, missedChars, extraChars, wpm, accuracy, wpmData, accuracyData } = props;
    let wpmSet = new Set();
    const filteredWpmData = wpmData.filter((i) => {
        if (!wpmSet.has(i[0])) {
            wpmSet.add(i[0]);
            return i;
        }
    });

    let accuracySet = new Set();
    const filteredAccuracyData = accuracyData.filter((i) => {
        if (!accuracySet.has(i[0])) {
            accuracySet.add(i[0]);
            return i;
        }
    });

    const user = auth.currentUser;
    // console.log(user)

    const pushResultToDatabase = async () => {
        if (isNaN(accuracy)) {
            toast.error('Invalid Test', {
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

        try {
            const documentRef = await addDoc(collection(db, 'test-results'), {
                wpm: wpm,
                accuracy: accuracy,
                charaters: `${correctChars} / ${incorrectChars} / ${missedChars} / ${extraChars}`,
                timeStamp: new Date(),
                userId: user.uid
            });
            toast.success('Test result saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        catch(error){
            toast.error('usable to save results', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    useEffect(() => {
        if (user) {
            pushResultToDatabase();
        }
        else {
            //no user, no save
            toast.warning("login to save test results", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, []);

    return (
        <div className="stats-box">
            <div className="left-stats">
                <div className="title">WPM</div>
                <div className="sub-title">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="sub-title">
                    {accuracy}
                    {(isNaN(accuracy)) ? '' : '%'}
                </div>
                <div className="title">Characters (correct/incorrect/missed/extra)</div>
                <div className="sub-title">
                    {correctChars} / {incorrectChars} / {missedChars} / {extraChars}
                </div>
                <button onClick={() => setTestEnd(false)}>Restart</button>
            </div>
            <div className="right-stats">
                <Graph wpmData={filteredWpmData} accuracyData={filteredAccuracyData} />
            </div>
        </div>
    )
}

export default Stats;