import React from 'react';
import styles from '../admin.module.css'

export function Usercomponent(props) {
    const data=props.data;
    return (
        <div className={styles.userContainer}>
            <h2 className={styles.userName}>Name:{data.username}</h2>
            <p className={styles.userEmail}><span>Email:</span>{data.email}</p>
            <button className={styles.removeButton}>Remove</button>
        </div>
    );
}