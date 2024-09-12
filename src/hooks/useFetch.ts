import {useEffect, useState} from "react";
import Nullable from "../util/Nullable.ts";

/*
* For get requests.
* Generic type is for the response interface.
* NOTE: for query params the path should end in /?
* */
function useFetch<ResponseType>(url: Nullable<string>, options?: {
    queryParams?: URLSearchParams,
    isImage?: boolean
}) {
    const [data, setData] = useState<ResponseType|undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function doFetch() {
            let fullUrl = url!;

            if(options){
                fullUrl = fullUrl + (options.queryParams !== undefined ? options.queryParams.toString() : '')
            }

            const resp = await fetch( fullUrl);

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

        if(url !== null) doFetch();
        else {
            setData(undefined);
            setIsLoading(false);
        }

    }, [])

    return { data, isLoading }
}

export default useFetch;