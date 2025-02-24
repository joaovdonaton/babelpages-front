import Nullable from "../../util/Nullable.ts";

interface UserWithProfileResponse {
    id: string,
    username: string,
    role: string,
    createdAt: number, // unix time in ms
    profile: {
        profilePictureUrl: Nullable<string>,
        country: Nullable<string>,
        bio: Nullable<string>,
        occupation: Nullable<string>,
    }
}

export default UserWithProfileResponse;