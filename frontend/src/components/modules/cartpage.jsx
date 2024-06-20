import { useEffect, useState } from "react";
import style from '../styles/cartpage.module.css'
import { Productcomponent } from "../pagecomponents/cartpage/cartprouct";

export function Cartpagecomponent() {
    const [arr, setArr] = useState([]);
    useEffect(() => {
        fetch("http://localhost:7700/loadcart", {
            method: "GET",
            credentials: "include"
        })
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                console.log(11, result);
                setArr(result)
            }).catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <div className={style.container}>
            <div className={style.header}>
                Welcome to Cart Page🛒
            </div>
            <nav className={style.navdiv} >
                <p>Buy</p>
                <p>Home</p>
            </nav>
            <div className={style.productslist}>
                {arr.map(value => <Productcomponent data={value} key={value._id} />)}
            </div>
        </div>
    );
}