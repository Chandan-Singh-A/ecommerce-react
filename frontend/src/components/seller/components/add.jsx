import { useState } from "react";
import styles from './add.module.css';
import swal from 'sweetalert2'

export function AddComponent() {
    const initState = {
        pname: "",
        pquant: "",
        pdesc: "",
        pprice: "",
        pimage: null
    }
    const [formState, setFormState] = useState(initState);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setFormState(prevState => ({
            ...prevState,
            pimage: file
        }));
    }

    const addProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pname', formState.pname);
        formData.append('pprice', formState.pprice);
        formData.append('pdesc', formState.pdesc);
        formData.append('pquant', formState.pquant);
        formData.append('pimage', formState.pimage);

        fetch("http://localhost:7700/addproducts", {
            method: "POST",
            body: formData,
            credentials: "include"
        })
            .then((result) => {
                if (result.status === 200) {
                    swal.fire({
                        icon: 'success',
                        title: 'Product Added',
                        showConfirmButton: false,
                        timer: 1500 // Automatically close after 1.5 seconds
                    });
                }
                setFormState(initState);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.heading}>Add Product</h2>
            <form className={styles.form} onSubmit={addProduct}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Product Name</label>
                    <input
                        type="text"
                        name="pname"
                        className={styles.input}
                        value={formState.pname}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>Price</label>
                    <input
                        type="number"
                        name="pprice"
                        className={styles.input}
                        value={formState.pprice}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Description</label>
                    <textarea
                        name="pdesc"
                        className={styles.textarea}
                        value={formState.pdesc}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="quantity" className={styles.label}>Quantity</label>
                    <input
                        type="number"
                        name="pquant"
                        className={styles.input}
                        value={formState.pquant}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image" className={styles.label}>Product Image</label>
                    <input
                        type="file"
                        name="pimage"
                        className={styles.input}
                        accept="image/*"
                        onChange={handleFileInput}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Add Product</button>
            </form>
        </div>
    );
}