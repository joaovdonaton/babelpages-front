import Nullable from "../util/Nullable.ts";

interface ReviewDetailsResponse {
    id: string,
    title: string,
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

export default ReviewDetailsResponse;