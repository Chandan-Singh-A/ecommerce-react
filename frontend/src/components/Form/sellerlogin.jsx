import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './style.module.css'
import { Alert } from "antd";
export function SellerLoginUpComponent(){
    const navigate=useNavigate();
    const initState = {
        email:"",
        pass:"",
    }
    const [formState, setFormState] = useState(initState)
    const handleInput = (e)=>{
        setFormState(p=>{
            const obj = {...p}
            obj[e.target.name] = e.target.value
            return obj
        })
    }
    
    const login=()=>{
        if(formState.email==''|| formState.pass==''){
            alert("Enter Details Properly");
        }else{
            fetch("http://localhost:7700/sellerlogin", {
                method: "post",
                headers: { "content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formState)
            })
            .then((result) => {
                setFormState(initState);
                if (result.status == 200) {
                    navigate("/seller");
                }else if(result.status==401){
                    alert("Invalid Password");
                } else if(result.status==404){
                    alert("User Not Found");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    
    return(
        <div className={style.logindiv}>
            <h2>Login Seller</h2>
            <div className={style.details}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={formState.email} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <label htmlFor="password">Password</label>
                <input type="password" name="pass" value={formState.pass} onInput={handleInput} />
            </div>
            <div className={style.details}>
                <button onClick={e=>{login()}}>Login</button>
            </div>
            <p>Don't have A Seller Account? <a href="/seller/signup">Signup Here👈</a></p>
            <p>Login as a User <a href="/login">Signup Here👈</a></p>
        </div>
    )
}