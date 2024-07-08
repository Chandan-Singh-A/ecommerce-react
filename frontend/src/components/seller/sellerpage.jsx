import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from './seller.module.css'
import { AddComponent } from "./components/add";
import { UpdateProductComponent } from "./components/update";
import useGetDelayed from "../../../hooks/useGetDelayed";
import Swal from "sweetalert2";

export function Sellercomponent() {
    const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState("add")
    const [arr, setArr] = useState([]);

    console.log("arr", arr);
    const activeStyle = {
        backgroundColor: "red"
    }

    // const [isLoading, isError, products, setProducts, fetchProducts] = useGetDelayed("sellerproducts")

    // useEffect(() => {
    //     if (currentForm != 'update') return
    //     fetchProducts()
    // }, [currentForm])

    function getproducts() {
        fetch("http://localhost:7700/sellerproducts", {
            credentials: "include",
        })
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                console.log(result);
                setArr(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateproduct(data) {
        fetch("http://localhost:7700/updateproduct", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        }).then((result) => {
            if (result.status === 200) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Product has been updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                const index = arr.findIndex(v => v._id == data._id);
                const newArr = arr;
                newArr[index] = data;
                setArr(newArr)

            }
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem updating the product.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    function logout() {
        fetch("http://localhost:7700/logout", {
            credentials: "include",
            method: "POST",
        }).then((result) => {
            if (result.status == 200) {
                navigate("/");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetch("http://localhost:7700/auth", {
            credentials: "include",
        }).then((result) => {
            if (result.status == 401) {
                navigate("/seller/login");
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className={style.container}>
            <h1 className={style.mainHeading}>Seller Page</h1>
            <div className={style.subHeadingContainer}>
                <h2 className={style.subHeading} style={currentForm == "add" ? activeStyle : {}} onClick={() => setCurrentForm("add")}>Add Product</h2>
                <h2 className={style.subHeading} style={currentForm == "update" ? activeStyle : {}} onClick={() => {
                    setCurrentForm("update")
                    getproducts();
                }
                }>Update Product</h2>
                <h2 className={style.subHeading} style={currentForm == "order" ? activeStyle : {}} onClick={() => setCurrentForm("order")}>Orders</h2>
                <h2 className={style.subHeading} onClick={logout}>Logout</h2>
            </div>
            <div className={style.productContainer}>
                {currentForm == "add" ? <AddComponent /> : null}
                {currentForm === "update" ? arr.map(value => (
                    <UpdateProductComponent deleteProduct={(id) => setArr(p => p.filter(pr => pr._id != id))}
                        handleupdate={updateproduct}
                        data={value} key={value._id}
                    />
                )) : null}
                {currentForm == "order" ? <h1>order product</h1> : null}
            </div>
        </div>
    )
}