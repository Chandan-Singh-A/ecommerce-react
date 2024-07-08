import React from 'react';
import styles from './admin.module.css';
import { Usercomponent } from './components/user';
import { useState,useEffect } from 'react';

export function Admincomponent() {

    const [arr,setArr]=useState([]);
    
    useEffect(()=>{
        fetch("http://localhost:7700/users",{
            method:"GET",
            credentials:"include"
        }).then((result)=>{
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    },[])

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
                {arr.map(value=>(<Usercomponent data={value} key={data._id}/>))}               
            </div>
        </div>
    );
}