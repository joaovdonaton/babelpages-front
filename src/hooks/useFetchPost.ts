import {useState} from "react";
import Nullable from "../util/Nullable.ts";

/*
* ResponseType is for response body. BodyType is for request body.
* */
function useFetchPost<ResponseType, BodyType>(url: string) {
    const [responseBody, setResponseBody] = useState<ResponseType>();
    const [statusCode, setStatusCode] = useState<number|undefined>(undefined);

    async function doPost(body: Nullable<BodyType>){
        const response = await fetch(url, {
            method: "POST",
            body: body === null ? '' : JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(!response.ok){
            setStatusCode(response.status);
            console.log("Status code: " + response.status);
            console.log("Body: " + JSON.stringify(await response.json()));
            throw new Error("Failed to post to " + url)
        }

        const data = await response.json() as ResponseType;
        setResponseBody(data);
    }

    return { doPost, responseBody, statusCode }
}

export default useFetchPost;