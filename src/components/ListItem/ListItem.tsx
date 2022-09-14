import React from "react";
import styles from "./ListItem.module.css";


interface Props {
    name: string;
    age: number;
}

const ListItem: React.FC<Props> = ({ name, age }) => (
    <li className={styles.list} tabIndex={0}>
        <p className={styles.listName} dangerouslySetInnerHTML={{
            __html: name
        }} />
        <p className={styles.listAge}>{age} Years</p>
    </li>
)

export default React.memo(ListItem)