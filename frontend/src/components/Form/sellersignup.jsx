import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './style.module.css'
export function SellerSignUpComponent() {
    const initState = {
        username: "",
        email: "",
        pass: "",
        bName: "",
        adhaar: "",
    }
    const [formState, setFormState] = useState(initState)
    const [mssg, setMessage] = useState("");
    const handleInput = (e) => {
        setFormState(p => {
            const obj = { ...p }
            obj[e.target.name] = e.target.value
            return obj
        })
    }

    const signup = () => {
        console.log(formState);
        fetch("http://localhost:7700/sellersignup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(formState)
        })
            .then((result) => {
                if (result.status == 200) {
                    setFormState(initState);
                    setMessage("A Mail is sent to your gmail.Please Verify from their.");
                    setTimeout(() => { setMessage("") }, 5000)
                } else if (result.status == 300) {
                    alert("User already exist");
                    setTimeout(() => { setMessage("") }, 5000);
                } else {
                    navigate("/error")
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={style.logindiv}>
            <h2>SignUp</h2>
            <div className={style.details}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={formState.username} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={formState.email} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <label htmlFor="password">Password</label>
                <input type="password" name="pass" value={formState.pass} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <label htmlFor="bname">Business Name:</label>
                <input type="text" name="bName" value={formState.bName} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <label htmlFor="adhaar">Adhaar Card No:</label>
                <input type="text" name="adhaar" value={formState.adhaar} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <button onClick={e => { signup() }}>Signup</button>
            </div>
            <p>Already a Seller<a href="/seller/login">Login Here👈</a></p>
            <p>SignUp as An User<a href="/signup">Signup Here👈</a></p>
            <p style={{ color: "blue" }}>{mssg}</p>
        </div>
    )
}