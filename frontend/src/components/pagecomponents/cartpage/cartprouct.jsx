import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from "../../styles/cartcomponent.module.css"

export function Productcomponent(props) {
    const data=props.data;
    const navigate = useNavigate();
    function updateCartquant(){
        alert("update");
    }

    return (
        <div className="product" id="product">
            <img src={`http://localhost:7700/${data.productimg}`} alt="noimage" className="img" />
            <p>Product Name:{data.productname}</p>
            <p>Product Price:{data.productprice}</p>
            <p>Product Quantitiy:{data.cart_productquant}</p>
            <div>
                <button className={style.btnupdate}onClick={updateCartquant}>+</button>
                <button className={style.btnupdate}>-</button>
            </div>
        </div>
    )
}