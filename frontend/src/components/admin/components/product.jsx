import React from 'react';
import styles from './product.module.css';

export function ProductComponent({ data, productReqUpdation }) {
    return (
        <div className={styles.productContainer}>
            <img src={import.meta.env.VITE_SERVER_API + `/${data.pimg}`} alt={data.pname} className={styles.productImage} />
            <div className={styles.productDetails}>
                <h5 className={styles.productName}>{data.pname}</h5>
                <p className={styles.productPrice}>Price: {data.pprice}</p>
                <p className={styles.productQuantity}>Quantity: {data.pquant}</p>
            </div>
            <div className={styles.productActions}>
                <button className={styles.rejectButton} onClick={() => productReqUpdation(data._id, 0)}>Reject</button>
                <button className={styles.acceptButton} onClick={() => productReqUpdation(data._id, 1)}>Accept</button>
            </div>
        </div>
    );
}