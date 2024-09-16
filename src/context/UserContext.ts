import React, {createContext} from "react";
import UserWithProfileResponse from "../interfaces/response/UserWithProfileResponse.ts";

// we need this since we pass state and setstate as context value to update it
// see https://react.dev/reference/react/useContext#updating-data-passed-via-context
interface UserContextType {
    user: UserWithProfileResponse|undefined,
    setUser:  React.Dispatch<React.SetStateAction<UserWithProfileResponse | undefined>>
}

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setUser: () => {}
});