import { useEffect, useState } from "react";
import style from './cart.module.css'
import { Productcomponent } from "../Home/product";
import { useNavigate } from "react-router-dom";

export function Cartpagecomponent() {
    const navigate=useNavigate();
    const [arr, setArr] = useState([]);
    useEffect(() => {
        fetch("http://localhost:7700/loadcart", {
            method: "GET",
            credentials: "include"
        })
            .then((result) => {
                if(result.status==300){
                    navigate("/login")
                }else{
                    return result.json();
                }
            })
            .then((result) => {
                setArr(result)
            }).catch((err) => {
                console.log(err);
            });
    }, [])

    const commonStyle={
        fontSize:'18px',
        fontWeight:"700"
    }

    const cartItemProps = {
        leftButtonText:"-",
        rightButtonText:"+",
        leftButtonStyle:{...commonStyle, backgroundColor:"red"},
        rightButtonStyle:{...commonStyle, backgroundColor:"blue"},
        onLeftButtonClick:(id)=>{
            updateCartquant(id,false)
        },
        onRightButtonClick:(id)=>{
            updateCartquant(id,true)
        },
    }

    async function updateCartquantUI(id, op) {
        const updatedArr = arr.map((e) => {
            if (e._id === id) {
                return {
                    ...e,
                    productquant: op ? e.productquant + 1 : e.productquant - 1
                };
            }
            return e;
        });

        setArr(updatedArr);
    }
    
    function updateCartquant(id,op) {
        fetch(`http://localhost:7700/updatecart/${id}/${op}`,{
            method:"PUT",
            credentials:"include",
        }).then((result) => {
            if(result.status==200){
                updateCartquantUI(id,op);
            }else if(result.status==300){
                alert("Limit exceed")
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <div className={style.container}>
            <div className={style.header}>
                Welcome to Cart Page🛒
            </div>
            <nav className={style.navdiv} >
                <p>Buy</p>
                <p>Home</p>
            </nav>
            <div className={style.content}>
                {arr.map(value => <Productcomponent  {...cartItemProps} data={{ ...value, productquant: value.cart_productquant }} key={value._id} />)}
            </div>
        </div>
    );
}