import { useState } from "react";
import styles from './style.module.css';

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
        console.log(formState);
        fetch("https://localhost:7700/")
        // Here you can also handle form submission to backend or other logic
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
