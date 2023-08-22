import React from "react";

const UpperMenu = ({countDown, changeCountDown}) => {
    return(
        <div className="upper-menu">
            <div className="counter">COUNTDOWN : {countDown}</div>
            <div className="counter-modes">
                <div className="counter-mode" id={15} onClick={changeCountDown} > 15S</div>
                <div className="counter-mode" id={30} onClick={changeCountDown} > 30S</div>
                <div className="counter-mode" id={60} onClick={changeCountDown} > 60S</div>
            </div>
        </div>
    )
};

export default UpperMenu;