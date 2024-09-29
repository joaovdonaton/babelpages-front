/* Various utility functions for handling stuff */


import Nullable from "./Nullable.ts";
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

/* We need this because our profile pictures will always be under same URL, even if they've changed. This happens
* because of caching. So we add query string to the end of the URL, just to make sure it's fetched again.
*
* Note that this is obvious not the most efficient solution, but changing the way I store the images in the backend
* would require too much work at this point, and is not worth doing for minimal gains in performance that no one
* will ever see.
* */
function generateImageURL(url: string | null): string {
    if(url === null) return ""; // falsy
    return `${url}?timestamp=${new Date().getTime()}`;
}

export {formatDate, generateImageURL};