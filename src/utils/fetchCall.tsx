export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" // this can be extended as time goes on


interface Props {
    path: string;
    params: Record<string, string>;
    method: HttpMethod;
    signal: AbortSignal;
}

export const fetchCall = async ({path, params, method, signal}: Props) => {
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    try {
        const queryString = new URLSearchParams(params);
        const new_url = `${url}?${queryString}`;
        const options: Record<string, any> = {
            mode: "cors",
            method,
            signal,
        };

        const response = await fetch(new_url, options);

        return response.json();
    } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
    }
}