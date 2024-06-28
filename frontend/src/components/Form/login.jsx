import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './style.module.css'
export function Logincomponent() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("object");
        fetch("http://localhost:7700/auth", {
            method: "GET",
            credentials: "include",
        })
            .then((result) => {
                if (result.status == 200) {
                    navigate("/");
                }
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const login = () => {
        if (email == "" || pass == "") {
            alert("Enter Details")
            return;
        }

        console.log(email, pass);
        fetch("http://localhost:7700/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, pass })
        })
            .then((result) => {
                if (result.status == 200) {
                    navigate("/");
                } else {
                    alert("Given Credentials are not Valid");
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={style.logindiv}> {/* Add id="login-div" */}
            <h2>Login</h2>
            <div className={style.details}> {/* Add id="details" */}
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onInput={e => (setEmail(e.target.value))} />
            </div>
            <div className={style.details}> {/* Add id="details" */}
                <label htmlFor="password">Password:</label>
                <input type="password" value={pass} onInput={e => (setPass(e.target.value))} />
                <Link to="/forgotpassword" id="forgot-password">Forgot Password?</Link>
            </div>
            <div className={style.details}> {/* Add id="details" */}
                <button onClick={e => login()}>Login</button>
            </div>
            {/* <a href="http://127.0.0.1:7700/forgotmail">Forgot Password?</a> */}
            <p>Don't have An Account? <a href="/signup">Signup Here👈</a></p>
            <p>Are You a Seller? <a href="/seller/login">Login As Seller👈</a></p>
            <p id="error"></p>
        </div>
    )
}