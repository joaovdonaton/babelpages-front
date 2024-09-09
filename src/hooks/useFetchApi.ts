import {useEffect, useState} from "react";
import Nullable from "../util/Nullable.ts";

/*
* NOTE: for query params the path should end in /?
* */
function useFetchApi<Type>(url: Nullable<string>, options?: {
    queryParams?: URLSearchParams,
    isImage?: boolean
}) {
    const [data, setData] = useState<Type|undefined>();

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
                setData(await resp.json() as Type);
            }
            else{
                setData(URL.createObjectURL(await resp.blob()) as Type);
            }
        }

        if(url !== null) doFetch();
        else setData(undefined);

    }, [])

    return { data }
}

export default useFetchApi;