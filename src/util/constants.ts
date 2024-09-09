const monthNumToWord = new Map<number, string>([
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"]
]);

const BABEL_URL = import.meta.env.VITE_API_URL;

export {monthNumToWord, BABEL_URL};