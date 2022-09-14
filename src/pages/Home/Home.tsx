import * as React from "react";
import { SearchWithDropDown } from "../../components/SearchWithDropDown/SearchWithDropDown";
import { useHome } from "./Home.hook";
import styles from "./Home.module.css";

export const Home = () => {
    const { text, handleChange, debouncedSearch, appState: {data, status} } = useHome();

    return (
        <main className={styles.home}>
            <SearchWithDropDown text={text} handleChange={handleChange} data={data} status={status} searchQuery={debouncedSearch} />
        </main>
    )
}