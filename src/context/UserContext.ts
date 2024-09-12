import React, {createContext} from "react";
import UserSelfResponse from "../interfaces/response/UserSelfResponse.ts";

// we need this since we pass state and setstate as context value to update it
// see https://react.dev/reference/react/useContext#updating-data-passed-via-context
interface UserContextType {
    user: UserSelfResponse|undefined,
    setUser:  React.Dispatch<React.SetStateAction<UserSelfResponse | undefined>>
}

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setUser: () => {}
});