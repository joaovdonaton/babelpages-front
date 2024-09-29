import {useState} from "react";
import MultipartFormPart from "../interfaces/misc/MultipartFormPart.ts";

/*
* ResponseType is for response body. BodyType is for request body.
* Version of fetch with body for multipart requests
* For now we only need this to support one file and one object
* */
function useFetchMultipart<BodyType, ResponseType = null>(url: string, method: "POST" | "PATCH" = "POST",
                                                   authToken?: string) {
    const [responseBody, setResponseBody] = useState<ResponseType>();
    const [statusCode, setStatusCode] = useState<number|undefined>(undefined);

    async function doRequest(body?: MultipartFormPart<BodyType>, file?: MultipartFormPart<File>){
        if(method == "PATCH"){
            // in this case we want to omit fields we wont change
        }

        const multipartBody = new FormData();
        if(body !== undefined) multipartBody.set(body.name, JSON.stringify(body.content));
        if(file !== undefined) multipartBody.set(file.name, file.content);

        const response = await fetch(url, {
            method: method,
            body: multipartBody,
            headers: {
                // let browser set content-type properly
                "Authorization": `Bearer ${authToken}`,
            }
        });

        setStatusCode(response.status);
        if(!response.ok){
            console.log("Non ok status code: " + response.status + ", while fetching " + url);
        }

        const data = await response.json() as ResponseType;
        setResponseBody(data);
    }

    return { doRequest, responseBody, statusCode }
}

export default useFetchMultipart;