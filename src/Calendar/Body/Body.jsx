import React, {useContext} from "react";
import { DateContext } from "../Calendar.jsx";
import styles from "./Body.module.css";

function Body() {
    const {selectedDate, setSelectedDate, view, setView, userLocale, getDecade} = useContext(DateContext);


    const getMonthDays = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }

    const getFirstDay = (year, month) => {
        return new Date(year, month, 1).getDay();
    }

    const renderView = () => {
        if (view === "calendar") {
            return(
                <>
                    <div className={styles.daysContainer}>{showWeekdays()}</div>
                    <div className={styles.cellsContainer}>{showCalendar()}</div>
                </>
            )
        } if (view === "months") {
            return(
                <div className={styles.monthsContainer}>{showMonths()}</div>  
            )
        } if (view === "years") {
            return(
                <div className={styles.yearsContainer}>{showYears()}</div> 
            )
        }
    }

    const handleDateClick = (date) => {
        setSelectedDate(date);
    }

    const handleMonthClick = (monthIndex) => {
        const date = new Date(selectedDate.getFullYear(), monthIndex, 1);
        setSelectedDate(date);
        setView("calendar");
    }

    const handleYearClick = (year) => {
        setSelectedDate(new Date(year, 0, 1));
        showMonths();
        setView("months");
    }

    const showWeekdays = () => {
        const weekdays = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(Date.UTC(2024, 0, i + 1));
            weekdays.push(
                <div key={`wd${i}`} className={styles.day}>{day.toLocaleString(userLocale, {weekday: "short"})}</div>
            )
        }

        return weekdays;
    }

    const showCalendar = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const monthDays = getMonthDays(year, month);
        const firstDay = getFirstDay(year, month);

        const allCells = [];

        for (let e = 0; e < firstDay; e++) {
            allCells.push(
                <div key={`e${e}`} className={`${styles.cell} ${styles.emptyCell}`}></div>
            );
        }

        for (let d = 1; d <= monthDays; d++) {
            const date = new Date(year, month, d);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString() ? "selectedCell" : "";
            const classNames = isSelected ? `${styles.cell} ${styles[isSelected]}` : `${styles.cell}`;

            allCells.push(
                <div key={`d${d}`} className={classNames} onClick={() => handleDateClick(date)}>{d}</div>
            );
        }

        return allCells;
    }

    const showMonths = () => {
        const months = [];

        for (let i = 0; i < 12; i++) {
            const month = new Date(2024, i, 1);

            months.push(
                <div key={`m${i}`} className={styles.month} onClick={() => handleMonthClick(i)}>{month.toLocaleString(userLocale, {month: "long"})}</div>
            )
        }

        return months;
    }

    const showYears = () => {
        const {decadeStart, decadeEnd} = getDecade();
        const decade = [];

        for (let i = decadeStart; i <= decadeEnd; i++) {
            const year = new Date(i, 0, 1)
            decade.push(
                <div key={`yr${i}`} className={styles.year} onClick={() => handleYearClick(i)}>{year.toLocaleString(userLocale, {year: "numeric"})}</div>
            )
        }

        return decade;
    }

    return(
        <div className={styles.body}>{renderView()}</div>
    )
}

export default Body;