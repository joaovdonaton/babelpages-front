import {useState} from "react";
import Nullable from "../util/Nullable.ts";

/*
* ResponseType is for response body. BodyType is for request body.
* */
function useFetchWithBody<BodyType, ResponseType>(url: string, method: "POST" | "PATCH" = "POST") {
    const [responseBody, setResponseBody] = useState<ResponseType>();
    const [statusCode, setStatusCode] = useState<number|undefined>(undefined);

    async function doRequest(body: Nullable<BodyType>){
        const response = await fetch(url, {
            method: method,
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

    return { doRequest, responseBody, statusCode }
}

export default useFetchWithBody;