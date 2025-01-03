import React, {useState, createContext} from "react";
import Header from "./Header/Header.jsx";
import Body from "./Body/Body.jsx";
import Footer from "./Footer/Footer.jsx";
import styles from "./Calendar.module.css";

export const DateContext = createContext();

function Calendar(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState("calendar");
    const userLocale = navigator.language;

    const getDecade = () => {
        const year = selectedDate.getFullYear();
        const decadeStart = Math.floor(year / 10) * 10;
        const decadeEnd = decadeStart + 9;

        return {decadeStart, decadeEnd};
    }

    const contextData = {selectedDate, setSelectedDate, view, setView, userLocale, getDecade};

    return(
        <div className={styles.main}>
            <DateContext.Provider value={contextData}>
                <Header/>
                <Body/>
                <Footer/>
            </DateContext.Provider>
        </div>
    )
}

export default Calendar