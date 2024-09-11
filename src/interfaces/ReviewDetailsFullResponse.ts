import Nullable from "../util/Nullable.ts";

interface ReviewDetailsFullResponse {
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

export default ReviewDetailsFullResponse;