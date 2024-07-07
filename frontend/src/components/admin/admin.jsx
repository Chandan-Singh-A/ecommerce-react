// AdminComponent.jsx

import React from 'react';
import styles from './admin.module.css';

export function Admincomponent() {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainHeading}>Admin Page</h1>
            <div className={styles.subHeadingContainer}>
                <h2 className={styles.subHeading}>Users</h2>
                <h2 className={styles.subHeading}>Sellers</h2>
                <h2 className={styles.subHeading}>Sellers Requests</h2>
                <h2 className={styles.subHeading}>Product Requests</h2>
            </div>
            <div className={styles.productContainer}>
            </div>
        </div>
    );
}
