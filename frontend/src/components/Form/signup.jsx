import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import style from './style.module.css'
export function Signupcomponent() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [msg, setMessage] = useState("");

    const signup = () => {
        fetch("http://localhost:7700/signup", {
            method: "POST",
            headers: {
                'content-type':'application/json'
            },
            credentials:"include",
            body: JSON.stringify({ email, pass, name })
        })
            .then((result) => {
                if (result.status == 200) {
                    setEmail("");
                    setName("");
                    setPass("");
                    setMessage("A Mail is sent to your gmail.Please Verify from their.");
                    setTimeout(() => { setMessage("") }, 5000)
                } else if (result.status == 300) {
                    alert("User already exist");
                } else {
                    navigate("/error")
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={style.logindiv}> {/* Add id="login-div" */}
            <h2>SignUp Page</h2>
            <div className={style.details}> {/* Add id="details" */}
                <label htmlFor="name">Username:</label>
                <input type="text" value={name} onInput={e => setName(e.target.value)} />
            </div>
            <div className={style.details}> {/* Add id="details" */}
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onInput={e => setEmail(e.target.value)} />
            </div>
            <div className={style.details} id="details"> {/* Add id="details" */}
                <label htmlFor="password">Password:</label>
                <input type="password" value={pass} onInput={e => setPass(e.target.value)} />
            </div>
            <div className={style.details} id="details"> {/* Add id="details" */}
                <button id="login-button" onClick={e => signup()}>Signup</button>
            </div>
            <p>Already has Account? <a href="/login">Login Here👈</a></p>
            <p>Sign up as a Seller <a href="/seller/signup">Signup Here👈</a></p>
            <p style={{ color: "blue" }}>{msg}</p>
        </div>
    )
}