import React, {useContext} from "react";
import { DateContext } from "../Calendar.jsx";
import styles from "./Footer.module.css";

function Footer(){
    const {selectedDate, userLocale} = useContext(DateContext);

    return(
        <div className={styles.footer}>
            {selectedDate && (
                <div>{selectedDate.toLocaleDateString(userLocale)}</div>
            )}
        </div>
    )
}

export default Footer;