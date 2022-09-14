import * as React from "react";
import { EmbeddedNotice, Notice, Status } from "../../types";
import { fetchCall } from "../../utils/fetchCall";
import { useDebounce } from "../../utils/hooks/useDebounce/useDebounce";

interface Props {
    status: Status;
    data: ReadonlyArray<EmbeddedNotice>;
    error: string | null;
}

const DEBOUNCE_DELAY = 200;

export const useHome = () => {
    const [text, setText] = React.useState("");
    const [appState, setAppState] = React.useState<Props>({
        status: "rest",
        data: [],
        error: null,
    });
    
    const debouncedSearch = useDebounce(text, DEBOUNCE_DELAY);

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (debouncedSearch) {
            handleRequest(debouncedSearch, signal);
        } else {
            setAppState(state => ({ ...state, status: "rest", data: [] }));
        }

        return () => {
            controller.abort();
        }
    }, [debouncedSearch]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    };


    const handleRequest = async (forename: string, signal: AbortSignal) => {
        try {
            setAppState((state) => ({ ...state, status: "loading" }));
            const params = { forename };

            const { _embedded: { notices } } = await fetchCall({ path: "red", params, method: "GET", signal, }) as unknown as Notice;
            setAppState((state) => ({
                ...state,
                status: notices.length === 0 ? "empty" : "success",
                data: notices
            }));
        } catch (error) {
            const { message } = error as Error;
            setAppState(state => ({ ...state, status: "failure", error: message }));
        }
    };

    return {
        handleChange,
        text,
        debouncedSearch,
        appState,
    }
}