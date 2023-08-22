import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate, count } from "random-words";
import { useTheme } from "../Context/ThemeContext";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

let intervalId = null;
const TypingBox = () => {
    const [words, setWords] = useState(() => generate(50));
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);

    const { timer, setTimer } = useTestMode();
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);

    const [countDown, setCounDown] = useState(timer);
    const [wpmData, setWpmData] = useState([]);
    const [accuracyData, setAccuracyData] = useState([]);
    // console.log(words)
    const inputRef = useRef(null);


    let emptySpansRef = () => {
        return Array(words.length)
            .fill(0)
            .map((i) => createRef(null))
    };
    const [wordSpanRef, setWordSpanRef] = useState(emptySpansRef());

    const startTimer = () => {
        intervalId = setInterval(time, 1000);
        function time() {
            setCounDown((prevCount) => {
                // To prevent count value as negative
                if (prevCount === 0) {
                    clearInterval(intervalId);
                    setTestEnd(true);
                    return 0;
                }

                setCorrectChars((correctChars) => {
                    // console.log("correct chars",correctChars);
                    setWpmData((wpmData) => {
                        return [
                            ...wpmData, [
                                timer - prevCount + 1,
                                Math.round(correctChars / 5 / ((timer - prevCount + 1) / 60))
                            ]
                        ]
                    });
                    return correctChars;
                });

                setCurrWordIndex((currWordIndex) => {
                    setCorrectWords((correctWords) => {
                        setAccuracyData((accuracy) => {
                            return [
                                ...accuracy, [
                                    timer - prevCount - 1,
                                    Math.round((correctWords / (currWordIndex + 1) * 100))
                                ]
                            ]
                        });
                        return correctWords;
                    });
                    return currWordIndex;
                });

                return prevCount - 1;
            });
        }
    }

    const handleKeyDownInput = (e) => {
        // console.log(e);
        if (!testStart) {
            setTestStart(true);
            startTimer();
        }

        let currWordChars = wordSpanRef[currWordIndex].current.childNodes;
        // console.log(currWordChars);

        // logic for space press -> increase my currWordIndex by 1 leads to next word
        if (e.keyCode === 32) {   // keycode for space=32
            const correctCharsArray = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');
            if (correctCharsArray.length === currWordChars.length) {
                setCorrectWords(correctWords + 1);
            }

            // To remove cursor
            if (currCharIndex >= currWordChars.length) {
                // Cursor is present at right side
                currWordChars[currCharIndex - 1].classList.remove('right-current');
            }
            else {
                //cursor is within given word length
                setMissedChars(missedChars + (currWordChars.length - currCharIndex));
                for (let i = currCharIndex; i < currWordChars.length; i++) {
                    currWordChars[i].className += ' skipped';
                }
                currWordChars[currCharIndex].className = currWordChars[currCharIndex].className.replace('current', '');
            }
            wordSpanRef[currWordIndex + 1].current.childNodes[0].className = 'char current';
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }

        // Logic for backspace key
        if (e.keyCode === 8) {
            let currentWord = currWordChars[currCharIndex - 1];
            if (currentWord != undefined) {
                if (currentWord.classList.contains('correct')) {
                    setCorrectChars(correctChars - 1);
                }
                else if (currentWord.classList.contains('extra')) {
                    setExtraChars(extraChars - 1);
                }
                else if (currentWord.classList.contains('incorrect')) {
                    setIncorrectChars(incorrectChars - 1);
                }
                else {
                    setMissedChars(missedChars - 1);
                }
            }

            // To go to previous word
            if (currCharIndex === 0) {
                if (currWordIndex === 0) {
                    return;
                }

                let previousWord = wordSpanRef[currWordIndex - 1].current.childNodes;
                currWordChars[currCharIndex].className = 'char';
                previousWord[previousWord.length - 1].className += ' right-current';
                setCurrWordIndex(currWordIndex - 1);
                setCurrCharIndex(previousWord.length);
            }
            else if (currWordChars[currCharIndex - 1].classList.contains('extra')) {
                // Removing extra chars typed
                currWordChars[currCharIndex - 1].remove();
                setCurrCharIndex(currCharIndex - 1);
                currWordChars[currCharIndex - 2].className += ' right-current';
            }
            else if (currWordChars.length === currCharIndex) {
                // if the cursor is at the end of the current word
                if (wordSpanRef[currWordIndex].current.querySelectorAll('correct').length === currWordChars.length) {
                    setCorrectWords(correctWords - 1);
                }
                currWordChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }
            else {
                currWordChars[currCharIndex].className = 'char';
                currWordChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }
            return;
        }

        // Adding a new extra character
        if (currCharIndex === currWordChars.length) {
            setExtraChars(extraChars + 1);
            let newSpan = document.createElement('span');   // -> <span></span>
            newSpan.innerText = e.key;
            newSpan.className = 'char incorrect extra right-current';
            currWordChars[currCharIndex - 1].classList.remove('right-current');   // Imp: 'classList'
            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            return;
        }

        // Check for correct character
        //console.log(currWordChars[currCharIndex])   o/p:- <span class="char current">n</span>
        if (e.key === currWordChars[currCharIndex].innerText) {
            currWordChars[currCharIndex].className = 'char correct';
            setCorrectChars(correctChars + 1);
        }
        else {
            currWordChars[currCharIndex].className = 'char incorrect';
            setIncorrectChars(incorrectChars + 1);
        }

        if (currCharIndex + 1 === currWordChars.length) {
            // current word written
            currWordChars[currCharIndex].className += ' right-current';   // concating with 'current' class
        }
        else {
            currWordChars[currCharIndex + 1].className = 'char current';
        }
        setCurrCharIndex(currCharIndex + 1);
    }
    // console.log(wordSpanRef)

    const resetWordRefClassName = () => {
        wordSpanRef.map((wordRef) => {
            Array.from(wordRef.current.childNodes).map((char) => {
                if (char.classList.contains('extra')) {
                    char.remove();
                }
                else {
                    char.className = 'char';
                }
            })
        });
        wordSpanRef[0].current.childNodes[0].className = 'current';
    }
    const changeCountDown = (e) => {
        // console.log(e.target.id);
        setCounDown(Number(e.target.id));
        setTimer(Number(e.target.id));
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setIncorrectChars(0);
        setCorrectWords(0);
        setMissedChars(0);
        setExtraChars(0);
        setWpmData([]);
        setAccuracyData([]);
        setWords(generate(50));
        focusInput();
        clearInterval(intervalId);
        resetWordRefClassName();
    }

    const focusInput = () => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }

    const calculateWPM = () => {
            return Math.round(correctChars / 5 / (timer / 60));
    }

    const calculateAccuracy = () => {
        return Math.round((correctWords / currWordIndex) * 100);
    }

    useEffect(() => {
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'char current';
    }, []);

    useEffect(() => {
        if(!testEnd){
            setCurrWordIndex(0);
            setCurrCharIndex(0);
            setCorrectChars(0);
            setIncorrectChars(0);
            setMissedChars(0);
            setExtraChars(0);
            setCorrectWords(0);
            setCorrectChars(0);
            setWpmData([]);
            setAccuracyData([]);
            setCounDown(timer);
            setTestStart(false);
            setWords(generate(50));
            resetWordRefClassName();
            focusInput();
            wordSpanRef[0].current.childNodes[0].className = 'current';
        }
    },[testEnd])
    return (
        <div className="typingBox" onClick={focusInput}>
            {
                testEnd ? (
                    <Stats
                        setTestEnd={setTestEnd}
                        correctChars={correctChars}
                        incorrectChars={incorrectChars}
                        missedChars={missedChars}
                        extraChars={extraChars}
                        wpm={calculateWPM()}
                        accuracy={calculateAccuracy()}
                        wpmData={wpmData}
                        accuracyData={accuracyData}
                    />
                )
                    :
                    (
                        <div>
                            <UpperMenu countDown={countDown} changeCountDown={changeCountDown} />
                            <div className="words-container">
                                {
                                    words.map((word, index) => {
                                        return (
                                            <span className="word" key={index} ref={wordSpanRef[index]} >
                                                {
                                                    word.split('').map((char, index) => {
                                                        return <span className="char" key={index}>{char}</span>
                                                    })
                                                }
                                            </span>
                                        )
                                    })
                                }
                            </div>

                            <input type="text" className="hidden-input" ref={inputRef} onKeyDown={(e) => handleKeyDownInput(e)} />
                        </div>
                    )
            }

        </div>
    )
}

export default TypingBox;