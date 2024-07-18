import { useEffect, useState } from "react";
import style from './cart.module.css'
import { Productcomponent } from "../Home/product";
import { useNavigate } from "react-router-dom";
import { PurchaseComponent } from "./components/purchase";
export function Cartpagecomponent() {
    const navigate = useNavigate();
    const [arr, setArr] = useState([]);
    const [buy, setBuy] = useState(false)
    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_API + "/loadcart", {
            method: "GET",
            credentials: "include",
            cache: "no-store" // or "no-cache"

        }).then((result) => {
            if (result.status == 300) {
                navigate("/login")
            } else {
                return result.json();
            }
        })
            .then((result) => {
                setArr(result)
            }).catch((err) => {
                console.log(err);
            });
    }, [])

    const commonStyle = {
        fontSize: '18px',
        fontWeight: "700"
    }

    const cartItemProps = {
        leftButtonText: "-",
        rightButtonText: "+",
        leftButtonStyle: { ...commonStyle, backgroundColor: "red" },
        rightButtonStyle: { ...commonStyle, backgroundColor: "blue" },
        onLeftButtonClick: (id) => {
            updateCartquant(id, false)
        },
        onRightButtonClick: (id) => {
            updateCartquant(id, true)
        },
    }

    async function updateCartquantUI(id, op) {
        const updatedArr = arr.map((e) => {
            if (e._id === id) {
                return {
                    ...e,
                    pquant: op ? e.pquant + 1 : e.pquant - 1
                };
            }
            return e;
        });

        setArr(updatedArr);
    }

    function deletecart(id) {
        let temp = arr.filter((e) => {
            return e._id !== id;
        })
        console.log("arr=", arr);
        console.log("Temp=", temp);
        setArr(temp);
    }

    function updateCartquant(id, op) {
        fetch(import.meta.env.VITE_SERVER_API + `/updatecart/${id}/${op}`, {
            method: "PUT",
            credentials: "include",
        }).then((result) => {
            if (result.status == 200) {
                updateCartquantUI(id, op);
            } else if (result.status == 300) {
                alert("Limit exceed")
            } else if (result.status == 350) {
                deletecart(id);
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
                <p onClick={() => { setBuy(true) }}>Buy</p>
                <p onClick={() => { navigate("/") }}>Home</p>
            </nav>
            <div className={style.content}>
                {buy ? <div className={style.buydiv}>
                    <div className={style.buydiv1}>
                        <PurchaseComponent setter={setBuy} />
                    </div>
                    <div className={style.buydiv2}>
                        {arr.map(value => <Productcomponent  {...cartItemProps} data={{ ...value, productquant: value.cart_productquant }} key={value._id}  flag={buy} />)}
                    </div>
                </div>
                    :
                    arr.map(value => <Productcomponent  {...cartItemProps} data={{ ...value, productquant: value.cart_productquant }} key={value._id} />)}
            </div>
        </div>
    );
}