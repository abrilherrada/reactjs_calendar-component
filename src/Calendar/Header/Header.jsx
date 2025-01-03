import React, {useContext} from "react";
import { DateContext } from "../Calendar.jsx";
import styles from "./Header.module.css";

function Header(){
    const {selectedDate, setSelectedDate, view, setView, userLocale, getDecade} = useContext(DateContext);
    const formattedMonth = selectedDate.toLocaleString(userLocale, {month: "long"});
    const capitalizedMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
    const year = selectedDate.toLocaleString(userLocale, {year: "numeric"});
    let {decadeStart, decadeEnd} = getDecade();

    const goToPreviousMonth = () => {
        setSelectedDate((s) => {
            const previousMonth = s.getMonth() - 1;
            const previousYear = s.getFullYear();
            return new Date(previousYear, previousMonth);
        });
    }

    const goToNextMonth = () => {
        setSelectedDate((s) => {
            const nextMonth = s.getMonth() + 1;
            const nextYear = s.getFullYear();
            return new Date(nextYear, nextMonth);
        });
    }

    const goToPreviousYear = () => {
        setSelectedDate((s) => {
            const previousYear = s.getFullYear() - 1;
            return new Date(previousYear, 0, 1);
        });
    }

    const goToNextYear = () => {
        setSelectedDate((s) => {
            const previousYear = s.getFullYear() + 1;
            return new Date(previousYear, 0, 1);
        });
    }

    const goToPreviousDecade = () => {
        decadeStart -= 10;
        setSelectedDate(new Date(decadeStart, 0, 1));
    }

    const goToNextDecade = () => {
        decadeStart += 10;
        setSelectedDate(new Date(decadeStart, 0, 1));
    }

    const handleMonthClick = () => {
        setView("months");
        setSelectedDate(new Date(selectedDate.getFullYear(), 0, 1));
    }

    const handleYearClick = () => {
        setView("years");
        setSelectedDate(new Date(decadeStart, 0, 1));
    }

    const renderHeader = () => {
        if (view === "calendar") {
            return(
                <>
                    <button className={styles.moveButton} onClick={goToPreviousMonth}>◀︎</button>
                    <h2>
                        <span onClick={handleMonthClick}>{capitalizedMonth} </span> 
                        <span onClick={handleYearClick}>{year}</span>
                    </h2>
                    <button className={styles.moveButton} onClick={goToNextMonth}>▶</button>
                </>
            )
        } if (view === "months") {
            return(
                <>
                    <button className={styles.moveButton} onClick={goToPreviousYear}>◀︎</button>
                    <h2>
                        <span onClick={handleYearClick}>{year}</span>
                    </h2>
                    <button className={styles.moveButton} onClick={goToNextYear}>▶</button>
                </>  
            )
        } if (view === "years") {
            return(
                <>
                    <button className={styles.moveButton} onClick={goToPreviousDecade}>◀︎</button>
                    <h2>
                        <span>{decadeStart}-{decadeEnd}</span>
                    </h2>
                    <button className={styles.moveButton} onClick={goToNextDecade}>▶</button>
                </>  
            )
        }
    }

    return(
        <div className={styles.header}>
            {renderHeader()}
        </div>
    )
}

export default Header;