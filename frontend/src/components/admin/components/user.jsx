import React from 'react';
import styles from '../admin.module.css'

export function Usercomponent({data,ob}) {
    return (
        <div className={styles.userContainer}>
            <h2 className={styles.userName}>Name:{data[ob.name]}</h2>
            <p className={styles.userEmail}><span>Email:</span>{data[ob.email]}</p>
            <button className={styles.removeButton}>Remove</button>
        </div>
    );
}