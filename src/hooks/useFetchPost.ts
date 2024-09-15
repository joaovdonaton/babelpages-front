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

        setStatusCode(response.status);
        if(!response.ok){
            console.log("Non 200 status code: " + response.status + ", while fetching " + url);
        }

        const data = await response.json() as ResponseType;
        setResponseBody(data);
    }

    return { doPost, responseBody, statusCode }
}

export default useFetchPost;