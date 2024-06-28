import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from './seller.module.css'
import { AddComponent } from "./components/add";

export function Sellercomponent(){
    const navigate=useNavigate();
    const [currentForm, setCurrentForm] = useState("add")
    const activeStyle = {
        backgroundColor:"red"
    }

    useEffect(()=>{
        fetch("http://localhost:7700/auth",{
            credentials:"include",
        }).then((result) => {
            if(result.status==300){
                navigate("/seller/login");
            }
        }).catch((err) => {
            console.log(err);
        });
    },[]);
    return(
        <div className={style.container}>
            <h1 className={style.mainHeading}>Seller Page</h1>
            <div className={style.subHeadingContainer}>
                <h2 className={style.subHeading} style={currentForm == "add" ? activeStyle : {}} onClick={()=>setCurrentForm("add")}>Add Product</h2>
                <h2 className={style.subHeading} style={currentForm == "update" ? activeStyle : {}} onClick={()=>setCurrentForm("update")}>Update Product</h2>
                <h2 className={style.subHeading} style={currentForm == "order" ? activeStyle : {}} onClick={()=>setCurrentForm("order")}>Orders</h2>
                <h2 className={style.subHeading}>Logout</h2>
            </div>
            <div className={style.productContainer}>
                {currentForm=="add"?<AddComponent />:null}
                {currentForm=="update"?<h1>update product</h1>:null}
                {currentForm=="order"?<h1>order product</h1>:null}
            </div>
        </div>
    )
}