import React from 'react';
import styles from './sellerapprove.module.css'
export function Sellerapprove({data ,updatefun}){
  return (
    <div className={styles.sellerApproval}>
      <div className={styles.sellerInfo}>
        <h3>{data.sellername}</h3>
        <p>Email: {data.sellermail}</p>
        <p>Business Name: {data.bName}</p>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.acceptButton} onClick={()=>updatefun(data._id,1)}>Accept</button>
        <button className={styles.rejectButton} onClick={()=>updatefun(data._id,0)}>Reject</button>
      </div>
    </div>
  );
};