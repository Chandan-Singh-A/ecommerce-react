import React, { useEffect, useState } from 'react';
import style from './update.module.css'
import Swal from 'sweetalert2';

export function UpdateProductComponent(props) {
    const [product, setProduct] = useState(props.data);

    const handleUpdate = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value
        }));
    };

    const handleDelete = (id) => {
        console.log(`Product with ID ${id} deleted`);
        fetch("http://localhost:7700/deleteproduct/" + id, {
            method: "DELETE",
            credentials: "include"
        }).then((result) => {
            if (result.status === 200) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Product has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            props.deleteProduct(id)
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem deleting the product.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };

    return (
        <div className={style.product}>
            <div className={style.productImage}>
                <img src={`http://localhost:7700/${product.productimg}`} alt="noimage" className={style.img}/>
            </div>
            <div className={style.productDetails}>
                <input
                    type="text"
                    value={product.productname}
                    className={style.productInput}
                    placeholder="Product Name"
                    onChange={(e) => handleUpdate('productname', e.target.value)}
                />
                <input
                    type="number"
                    value={product.productprice}
                    className={style.productInput}
                    placeholder="Price"
                    onChange={(e) => handleUpdate('productprice', e.target.value)}
                />
                <input
                    type="number"
                    value={product.productquant}
                    className={style.productInput}
                    placeholder="Quantity"
                    onChange={(e) => handleUpdate('productquant', e.target.value)}
                />
                <textarea
                    value={product.productdesc}
                    className={style.productTextarea}
                    placeholder="Description"
                    onChange={(e) => handleUpdate('productdesc', e.target.value)}
                />
            </div>
            <div className={style.productButtons}>
                <button onClick={() => handleDelete(product._id)} className={style.deleteButton}>Delete</button>
                <button onClick={() => props.handleupdate(product)} className={style.updateButton}>Update</button>
            </div>
        </div>
    );
}