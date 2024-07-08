import React from 'react';
import styles from './admin.module.css';
import { Usercomponent } from './components/user';
import { useState, useEffect } from 'react';

export function Admincomponent() {

    const [arr, setArr] = useState([]);
    const [currentForm, setCurrentForm] = useState("none")
    const activeStyle = {
        backgroundColor: "red",
    }

    useEffect(() => {
        fetch("http://localhost:7700/users", {
            method: "GET",
            credentials: "include"
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    function users() {
        fetch("http://localhost:7700/users", {
            method: "GET",
            credentials: "include"
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    function sellers() {
        fetch("http://localhost:7700/sellers", {
            method: "GET",
            credentials: "include"
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.mainHeading}>Admin Page</h1>
            <div className={styles.subHeadingContainer}>
                <h2 className={styles.subHeading} style={currentForm == "users" ? activeStyle : {}} onClick={() => {
                    setCurrentForm("users")
                    users();
                }}>Users</h2>
                <h2 className={styles.subHeading} style={currentForm == "sellers" ? activeStyle : {}} onClick={() => {
                    setCurrentForm("sellers")
                    sellers();
                }}>Sellers</h2>
                <h2 className={styles.subHeading}>Sellers Requests</h2>
                <h2 className={styles.subHeading}>Product Requests</h2>
                <h2 className={styles.subHeading}>Logout</h2>
            </div> <div className={styles.productContainer}>
                {currentForm=="none"? <div>
                    Welcome Back Admin
                </div>:null }
                {currentForm == "users" ? arr.map(value => (<Usercomponent data={value} key={value._id} ob={{ name: "username", email: "email" }} />)) : null}
                {currentForm == "sellers" ? arr.map(value => (<Usercomponent data={value} key={value._id} ob={{ name: "sellername", email: "sellermail" }} />)) : null}
            </div>
        </div>
    );
}