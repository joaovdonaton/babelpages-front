import {useState} from "react";
import Nullable from "../util/Nullable.ts";

/*
* ResponseType is for response body. BodyType is for request body.
* Version of fetch with body for multipart requests
* For now we only need this to support one file
* */
function useFetchMultipart<ResponseType, BodyType>(url: string, method: "POST" | "PATCH" = "POST", file?: File) {
    const [responseBody, setResponseBody] = useState<ResponseType>();
    const [statusCode, setStatusCode] = useState<number|undefined>(undefined);

    async function doRequest(body: Nullable<BodyType>){
        const multipartBody = new FormData();
        multipartBody.set("profileUpdateDTO") 

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

export default useFetchMultipart();