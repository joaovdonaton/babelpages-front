import Nullable from "../util/Nullable.ts";

interface BookSearchResult {
    id: string,
    title: string,
    price: Nullable<number>,
    coverURL: Nullable<string>,
    pubYear: number,
    pubMonth: Nullable<number>,
    pubDay: Nullable<number>,
    authors: string[],
    avgScore: Nullable<number>
}

export default BookSearchResult;