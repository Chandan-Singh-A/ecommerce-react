import React from 'react';
import styles from '../admin.module.css'

export function Usercomponent({data,ob,removeuser}) {
    return (
        <div className={styles.userContainer}>
            <h2 className={styles.userName}>Name:{data[ob.name]}</h2>
            <p className={styles.userEmail}><span>Email:</span>{data[ob.email]}</p>
            <button className={styles.removeButton} onClick={()=>removeuser(data._id)}>Remove</button>
        </div>
    );
}