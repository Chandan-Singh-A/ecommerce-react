import { useEffect, useState } from 'react';
import { Productcomponent } from './product';
import { Paginationn } from './pagination';
import style from './home.module.css'
import swal from 'sweetalert2';
import { UseNavigate } from 'react';
import { useNavigate } from 'react-router-dom';
import useGet from '../../../hooks/useGet';

export default function Loading() {
    return (
        <div>loading...</div>
    )
}



export function Homepagecomponent() {
    // const [arr, setArr] = useState([]);
    const [page, setPage] = useState(0);
    const [quantity, setQuantity] = useState(20);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    // async function fetchProductCount() {
        // const response = await fetch(import.meta.env.VITE_SERVER_API+'', {
        // const response = await fetch("http://localhost:7700/getproductscount", {
    //         credentials: "include"
    //     })
    //     const json = await response.json();
    //     setCount(json[0].count)
    //     setLoading(false);
    // }
    // useEffect(() => {
    //     try {
    //         setLoading(true);
    //         fetchProductCount();
    //     }
    //     catch (err) {
    //         setLoading(false)
    //         console.log(err);
    //     }
    //     console.log(loading);
    // }, []);

    const [isCountLoding, isCountError, countArr] = useGet("getproductscount")
    const [isProductLoaing, isProductError, arr] = useGet("loadproducts/"+page+"/"+quantity,[page,quantity])
    // useEffect(() => {
    //     fetch("http://localhost:7700/loadproducts/" + page + "/" + quantity, {
    //         method: "GET",
    //         credentials: "include",
    //     })
    //         .then((result) => {
    //             return result.json();
    //         })
    //         .then((result) => {
    //             console.log(result);
    //             setArr(result);
    //         })
    //         .catch((err) => {
    //             console.log("errrrrr", err);
    //         });
    // }, [page, quantity]);

    useEffect(()=>{
        setCount(countArr[0]?.count)
        // console.log(countArr);
    },[countArr])

    function onChangeInput(page, quantity) {
        setPage(page);
        setQuantity(quantity);
    }
    if (isProductLoaing) {
        return <Loading />
    }


    function showdescription(id) {
        const product = arr.filter(i=>i._id==id)
        swal.fire({
            html: `
                <div>
                    <p><strong>Product Name:</strong> ${product[0].productname}</p>
                    <p><strong>Product Price:</strong> ${product[0].productprice}</p>
                    <p><strong>Product Quantity:</strong> ${product[0].productquant}</p>
                    <p><strong>Product Description:</strong> ${product[0].productdesc}</p>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                container: 'custom-swal-container',
            }
        });
    }

    function addtocart(id) {
        const data = arr.filter(i=>i._id==id)
        const ob  = data[0]
        var cartob = {
            pid: ob._id,
            sellermail: ob.sellermail,
        }
        console.log("cartob=",cartob);
        fetch(import.meta.env.VITE_SERVER_API+"/addtocart", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(cartob),
        })
            .then((result) => {
                if (result.status == 200) {
                    swal.fire({
                        icon: 'success',
                        title: 'Added To Cart',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (result.status == 300) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Already Added in Cart'
                    });
                } else {
                    navigate("/login");
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    function logout(){
        fetch(import.meta.env.VITE_SERVER_API+"/logout",{
            method:"POST",
            credentials:"include",
        }).then((result) => {
            if(result.status==200){
                navigate("/login")
            }else{
                alert("Failed To Destroy Session")
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const productProps = {
        rightButtonText:'Add to Cart',
        leftButtonText:'Show Desc',
        onLeftButtonClick:showdescription,
        onRightButtonClick:addtocart,
        leftButtonStyle:{
            backgroundColor:"red"
        }
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1 >Welcome In Ecommerce Site</h1>
                </div>
                <div className={style.nav}>
                    <h5 onClick={()=>{
                        navigate("/cart");
                    }}>Cart</h5>
                    <h5 onClick={()=>logout()}>Logout</h5>
                </div>
                <div className={style.content}>
                    {
                        console.log(arr)
                    }
                    {arr.map(value => <Productcomponent {...productProps} data={value} key={value._id} />)}
                </div>
                <Paginationn onChangeInput={onChangeInput} value={count} />
            </div>
        </>
    );
}