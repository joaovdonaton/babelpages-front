import Nullable from "../util/Nullable.ts";

interface BookDetailsResponse {
    id: string,
    title: string,
    price: number,
    description: string,
    coverURL: Nullable<string>,
    language: string,
    pubYear: number,
    pubMonth: Nullable<number>,
    pubDay: Nullable<number>,
    authors: string[],
    tags: {name: string, type: string}[],
    avgScore: Nullable<number>,
    isbn: string,
    lowStock: boolean
}

export default BookDetailsResponse;