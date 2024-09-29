import {useEffect, useState} from "react";
import Nullable from "../util/Nullable.ts";

/*
* For get requests.
* Generic type is for the response interface.
* NOTE: for query params the path should end in /?
* */
function useFetch<ResponseType>(url: Nullable<string>, options?: {
    queryParams?: { [key: string]: string },
    isImage?: boolean
}) {
    const [data, setData] = useState<ResponseType|undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [statusCode, setStatusCode] = useState<number|undefined>(undefined);

    async function doFetch() {
        let fullUrl = url!;

        if(options){
            fullUrl = fullUrl + (options.queryParams !== undefined ? new URLSearchParams(options.queryParams).toString() : '')
        }

        const resp = await fetch( fullUrl);

        setStatusCode(resp.status)
        if (!resp.ok) {
            throw new Error('Failed to fetch data at api path: \'  ' + url + '  \'');
        }

        if(!options || !options.isImage || !options.isImage) {
            setData(await resp.json() as ResponseType);
        }
        else{
            setData(URL.createObjectURL(await resp.blob()) as ResponseType);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if(url !== null) doFetch();
        else {
            setData(undefined);
            setIsLoading(false);
        }

        /* We need url in here. When we change profiles (e.g from /users/john to /users/gabi) the ProfilePage
        * component gets called again, however the call for the doFetch in this useEffect only happens if the url
        * change is in the depedency list for the useEffect
        * same applies for other dependencies */
    }, [url, options?.queryParams])

    return { data, isLoading, statusCode }
}

export default useFetch;