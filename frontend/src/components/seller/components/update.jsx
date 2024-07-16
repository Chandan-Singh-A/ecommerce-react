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
                <img src={`http://localhost:7700/${product.pimg}`} alt="noimage" className={style.img}/>
            </div>
            <div className={style.productDetails}>
                <label className={style.productLabel}>Product Name</label>
                <input
                    type="text"
                    value={product.pname}
                    className={style.productInput}
                    placeholder="Product Name"
                    onChange={(e) => handleUpdate('pname', e.target.value)}
                />
                <label className={style.productLabel}>Price</label>
                <input
                    type="number"
                    value={product.pprice}
                    className={style.productInput}
                    placeholder="Price"
                    onChange={(e) => handleUpdate('pprice', e.target.value)}
                />
                <label className={style.productLabel}>Quantity</label>
                <input
                    type="number"
                    value={product.pquant}
                    className={style.productInput}
                    placeholder="Quantity"
                    onChange={(e) => handleUpdate('pquant', e.target.value)}
                />
                <label className={style.productLabel}>Description</label>
                <textarea
                    value={product.pdesc}
                    className={style.productTextarea}
                    placeholder="Description"
                    onChange={(e) => handleUpdate('pdesc', e.target.value)}
                />
            </div>
            <div className={style.productButtons}>
                <button onClick={() => handleDelete(product._id)} className={style.deleteButton}>Delete</button>
                <button onClick={() => props.handleupdate(product)} className={style.updateButton}>Update</button>
            </div>
        </div>
    );
}