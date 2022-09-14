import * as React from "react";
import { EmbeddedNotice } from "../../types";
import { age } from "../../utils/age";
import { highlight } from "../../utils/highlight";
import ListItem from "../ListItem/ListItem";
import styles from "./DropDown.module.css";

interface Props {
    data: ReadonlyArray<EmbeddedNotice>;
    searchQuery: string;
}



export const DropDown: React.FC<Props> = ({ data, searchQuery }) => (
    <div className={styles.card}>
        <ul className={styles.cardContainer}>
            {data.map(({ entity_id, forename, name, date_of_birth }) =>(
                    <ListItem
                        key={entity_id}
                        name={highlight(searchQuery, `${forename} ${name}`, styles.highlight)}
                        age={age(date_of_birth)}
                    />
                )
            )}
        </ul>
    </div>
)