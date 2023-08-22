import React from "react";
import Header from "../Components/Header";
import TypingBox from "../Components/TypingBox";
import Footer from "../Components/Footer";

const HomePage = () => {
    return(
        <div className="canvas">
            <Header />
            <TypingBox />
            <Footer />
        </div>
    )
}

export default HomePage;