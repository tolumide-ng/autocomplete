import * as React from "react";
import styles from "./Search.module.css"

export interface SearchProps {
    text: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ text, handleChange }) => (
    <div className={styles.search}>
        <h1 className={styles.searchTitle}>Find people on Interpol's red list</h1>
        <div className={styles.searchContainer}>
            <label className={styles.searchLabel} htmlFor="search">Search by forename</label>
            <input tabIndex={0} className={styles.searchInput} id="search" autoComplete="off" type="text" placeholder="Please enter search text" onChange={handleChange} value={text} />
        </div>
    </div>
);
