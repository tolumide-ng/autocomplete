import * as React from "react";
import styles from "./Notice.module.css";


interface Props {
    message: string;
    noticeType: "loading" | "empty" | "failure";
}

export const Notice: React.FC<Props> = ({ message, noticeType }) => {
    return (
        <div className={`${styles.card} ${noticeType === "loading" && styles.loading} ${noticeType === "empty" && styles.empty} ${noticeType === "failure" && styles.failure}`}>
            {message}
        </div>
    )
}