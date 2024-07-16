import React from 'react';
import styles from './admin.module.css';
import { Usercomponent } from './components/user';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export function Admincomponent() {

    const [arr, setArr] = useState([]);
    const [currentForm, setCurrentForm] = useState("none")
    const activeStyle = {
        backgroundColor: "red",
    }

    function users() {
        fetch(import.meta.env.VITE_SERVER_API+"/users", {
            method: "GET",
            credentials: "include",
            cache:"no-store"
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    function sellers() {
        fetch(import.meta.env.VITE_SERVER_API+"/sellers", {
            method: "GET",
            credentials: "include",
            cache:"no-store",
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    function removeuser(id) {
        fetch(import.meta.env.VITE_SERVER_API+"/removeuser", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, currentForm }),
            credentials:"include",
            cache:"no-store",
        })
        .then((response) => {
            if (response.ok) {
                setArr(arr.filter(user => user._id !== id));
                const userType = currentForm === "users" ? "User" : "Seller";
                Swal.fire({
                    icon: 'success',
                    title: `${userType} removed`,
                    text: `${userType} has been successfully removed from the site.`,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                throw new Error('Failed to remove user');
            }
        })
        .catch((error) => {
            console.error('Error removing user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Removal failed',
                text: 'There was an error removing the user. Please try again.',
                showConfirmButton: true
            });
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
                <h2 className={styles.subHeading} style={currentForm == "seller" ? activeStyle : {}} onClick={() => {
                    setCurrentForm("seller")
                    sellers();
                }}>Sellers</h2>
                <h2 className={styles.subHeading}>Sellers Requests</h2>
                <h2 className={styles.subHeading}>Product Requests</h2>
                <h2 className={styles.subHeading}>Logout</h2>
            </div> <div className={styles.productContainer}>
                {currentForm=="none"? <div>
                    <h1>Welcome Back Admin</h1>
                    <h5>Control Our Ecommerce Site From Here🛒🛒🛍️🏬</h5>
                    <p>
                        Hey admin, you can control users from here and remove the users that you want to. You can also see all the sellers and remove the sellers you want.
                        You can accept or reject a seller's request to become a seller. Additionally, you can see the product requests that are added by sellers on the website and accept or reject those product requests.
                    </p>
                </div>:null }
                {currentForm == "users" ? arr.map(value => (<Usercomponent data={value} key={value._id} removeuser={removeuser} ob={{ name: "name", email: "email" }} />)) : null}
                {currentForm == "seller" ? arr.map(value => (<Usercomponent data={value} key={value._id} removeuser={removeuser} ob={{ name: "sellername", email: "sellermail" }} />)) : null}
            </div>
        </div>
    );
}