import Nullable from "../util/Nullable.ts";

interface ReviewDetailsFull{
    id: string,
    title: string,
    bookTitle: string,
    bookId: string,
    body: string,
    score: number,
    funnyVotes: number,
    usefulVotes: number,
    poeticVotes: number,
    user: {
        id: string,
        username: string,
        role: Nullable<string>,
        createdAt: number
    }
}

export default ReviewDetailsFull;