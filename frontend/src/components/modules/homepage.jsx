import { useEffect, useState } from 'react';
import { Productcomponent } from '../pagecomponents/homepagecomponents/product';
import { Paginationn } from '../pagecomponents/homepagecomponents/pagination';
import Form from '../Form';
import style from './home.module.css'

export default function Loading() {
    return (
        <div>loading...</div>
    )
}



export function Homepagecomponent() {
    const [arr, setArr] = useState([]);
    const [page, setPage] = useState(0);
    const [quantity, setQuantity] = useState(20);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);
    async function fetchProductCount() {
        const response = await fetch("http://localhost:7700/getproductscount", {
            credentials: "include"
        })
        const json = await response.json();
        setCount(json[0].count)
        setLoading(false);
    }
    useEffect(() => {
        try {
            setLoading(true);
            fetchProductCount();
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
        console.log(loading);
    }, []);
    useEffect(() => {
        fetch("http://localhost:7700/loadproducts/" + page + "/" + quantity, {
            method: "GET",
            credentials: "include",
        })
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                console.log(result);
                setArr(result);
            })
            .catch((err) => {
                console.log("errrrrr", err);
            });
    }, [page, quantity]);

    function onChangeInput(page, quantity) {
        setPage(page);
        setQuantity(quantity);
    }
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1 >Welcome In Ecommerce Site</h1>
                </div>
                <div className={style.content}>
                    {arr.map(value => <Productcomponent data={value} key={value._id} />)}
                </div>
                <Paginationn onChangeInput={onChangeInput} value={count} />
            </div>
        </>
    );
}