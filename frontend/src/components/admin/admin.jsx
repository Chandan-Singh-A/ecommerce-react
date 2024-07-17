import React from 'react';
import styles from './admin.module.css';
import { useState } from 'react';
import { Usercomponent } from './components/user';
import { ProductComponent } from './components/product';
import Swal from 'sweetalert2';

export function Admincomponent() {

    const [arr, setArr] = useState([]);
    const [currentForm, setCurrentForm] = useState("none")
    const activeStyle = {
        backgroundColor: "red",
    }

    function users() {
        fetch(import.meta.env.VITE_SERVER_API + "/users", {
            method: "GET",
            credentials: "include",
            cache: "no-store"
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    function sellers() {
        fetch(import.meta.env.VITE_SERVER_API + "/sellers", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    function removeuser(id) {
        fetch(import.meta.env.VITE_SERVER_API + "/removeuser", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, currentForm }),
            credentials: "include",
            cache: "no-store",
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

    function productreq() {
        fetch(import.meta.env.VITE_SERVER_API + "/productreq", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        }).then((result) => {
            return result.json();
        }).then((result) => {
            setArr(result.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    function productReqUpdation(id, value){
        fetch(import.meta.env.VITE_SERVER_API + "/productrequpdation", {
            method: "PUT",
            credentials: "include",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, value: value })
        }).then((result) => {
            if (result.status === 200) {
                if (value === 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Request Accepted',
                        text: 'Product request has been accepted successfully.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else if (value === 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Request Rejected',
                        text: 'Product request has been rejected successfully.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                throw new Error('Failed to update product request');
            }
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an error updating the product request. Please try again.',
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
                <h2 className={styles.subHeading} style={currentForm == "productreq" ? activeStyle : {}} onClick={() => {
                    setCurrentForm("productreq")
                    productreq();
                }}>Product Requests</h2>
                <h2 className={styles.subHeading}>Logout</h2>
            </div> <div className={styles.productContainer}>
                {currentForm == "none" ? <div>
                    <h1>Welcome Back Admin</h1>
                    <h5>Control Our Ecommerce Site From Here🛒🛒🛍️🏬</h5>
                    <p>
                        Hey admin, you can control users from here and remove the users that you want to. You can also see all the sellers and remove the sellers you want.
                        You can accept or reject a seller's request to become a seller. Additionally, you can see the product requests that are added by sellers on the website and accept or reject those product requests.
                    </p>
                </div> : null}
                {currentForm == "users" ? arr.map(value => (<Usercomponent data={value} key={value._id} removeuser={removeuser} ob={{ name: "name", email: "email" }} />)) : null}
                {currentForm == "seller" ? arr.map(value => (<Usercomponent data={value} key={value._id} removeuser={removeuser} ob={{ name: "sellername", email: "sellermail" }} />)) : null}
                <div className={styles.productreqcontainer}>
                    {currentForm == "productreq" ? arr.map(value => (<ProductComponent data={value} key={value._id} productReqUpdation={productReqUpdation} />)) : null}
                </div>
            </div>
        </div>
    );
}