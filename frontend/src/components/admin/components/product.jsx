import React from 'react';
import styles from './product.module.css';
export function ProductComponent({data}) {
    return (
        <div className={styles.productContainer}>
            <img src={import.meta.env.VITE_SERVER_API+`/${data.pimg}`} alt={data.name} className={styles.productImage} />
            <div className={styles.productDetails}>
                <h2 className={styles.productName}>{data.pname}</h2>
                <p className={styles.productPrice}>Price: {data.pprice}</p>
                <p className={styles.productQuantity}>Quantity: {data.pquant}</p>
            </div>
            <div className={styles.productActions}>
                <button className={styles.acceptButton} onClick={() => acceptProduct(data.id)}>Accept</button>
                <button className={styles.rejectButton} onClick={() => rejectProduct(data.id)}>Reject</button>
            </div>
        </div>
    );
};