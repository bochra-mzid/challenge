import React, { useState, useContext } from "react";
import "../assets/css/login.css"
import "../assets/css/general.css"
import { useHistory } from 'react-router-dom'
import logo  from "../assets/img/EJE 2.png"
import {MyContext} from '../MyContext'

const Axios = require('axios')

export default function Login() {
    const {user,setUser}= useContext(MyContext)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [message, setMessage] = useState("")
    
    let history = useHistory()
    const isAuthen = (e) => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/checkToken",
            headers: {
                'Content-Type': "application/json",
                "x-access-token": localStorage.getItem("token")

            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                history.push('/home')
                console.log(user)
            }
        })
    }
    const login = (e) => {
        Axios({
            method: "POST",
            data: {
                email: loginEmail,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        }).then((response) => {
            if (response.data.auth) {
                setLoginStatus(true)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", response.data.id)
                setUser(response.data)
                isAuthen(e)
                setMessage('')

            }
            else {
                console.log(response.data)
                setLoginStatus(false)
                setMessage(response.data.message)
            }
        }
        )
    };
    return (

        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <div>
                    <img src={logo} className="logo"/>
                    <h3 className="Login">Login</h3>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={(e) => { setLoginEmail(e.target.value) }} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { setLoginPassword(e.target.value) }} />
                    </div>
                    <div type="submit" className="button" className="round-button primary submit primary-color" onClick={login}>Login</div>
                   
                    <div style={{color:"red"}}>{message}</div>
                    <p className="forgot-password text-right">
                     <a href="#">Forgot password?</a>
                </p>
                </form>
            </div>

        </div>

    );
}
