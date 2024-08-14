/* Various utility functions for handling stuff */


import Nullable from "../interfaces/Nullable.ts";
import { monthNumToWord } from "./constants.ts";

/*
* The backend returns publication date as three separate fields for year, date, month.
* Since it gets the data from OpenLibrary, sometimes the month field may be null, or both the month/day fields will be null
* */
function formatDate(year: number, month: Nullable<number>, day: Nullable<number>): string {
    if(month === null){
        return year.toString();
    }
    if(day === null){
        return `${monthNumToWord.get(month)} ${year}`
    }
    return `${day} ${monthNumToWord.get(month)}, ${year}`
}


export {formatDate}