// fetch hook specifically for paths in the babelpages api

import {useEffect, useState} from "react";

/*
* NOTE: for
* */
function useFetchApi<Type>(path: string, queryParams?: URLSearchParams) {
    const [data, setData] = useState<Type|undefined>();

    useEffect(() => {
        async function doFetch() {
            //if(path.startsWith("/")) path = path.substring(1);
            const resp = await fetch(import.meta.env.VITE_API_URL + path
            + (queryParams !== undefined ? queryParams.toString() : ''));

            if (!resp.ok) {
                throw new Error('Failed to fetch data at api path: \'  ' + path + '  \'');
            }

            setData(await resp.json() as Type);
        }

        doFetch();
    }, [])

    return { data }
}

export default useFetchApi;