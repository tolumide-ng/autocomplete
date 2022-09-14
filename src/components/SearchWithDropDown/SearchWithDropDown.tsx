import * as React from "react";
import { EmbeddedNotice, Status } from "../../types";
import { DropDown } from "../DropDown/DropDown";
import { Notice } from "../Notice/Notice";
import { Search, SearchProps } from "../Search/Search";
import styles from "./SearchWithDropDown.module.css";

interface SearchWithDropDownProps extends SearchProps {
    data: ReadonlyArray<EmbeddedNotice>;
    searchQuery: string;
    status: Status;
}

const notificationMessages: Record<Status, string> = {
    empty: "There are no names for this search request",
    failure: "There was a problem fulfilling your request, Please try again later",
    loading: "Loading",
    rest: "",
    success: ""
}

export const SearchWithDropDown: React.FC<SearchWithDropDownProps> = ({ handleChange, text, data, searchQuery, status }) => (
    <section className={styles.container}>
        <Search handleChange={handleChange} text={text} />
        {status === "success" ?
            <DropDown data={data} searchQuery={searchQuery} />
            : null
        }
        {
            status === "failure" || status === "loading" || status === "empty" ? 
                <Notice noticeType={status} message={notificationMessages[status]} />
                : null
        }
    </section>
)