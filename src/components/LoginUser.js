import React, {useEffect, useRef, useState} from 'react';
import http from "../Plugins/Fetch";
import {useHistory} from "react-router-dom"


const LoginUser = ({setGold, setHealth, setImage, setName, gold}) => {
    const loginUser = useRef()
    const loginPassword = useRef()

    const [data2, setData2] = useState([])
    const [error2, setError2] = useState([])
    const [errMsg, setErrMsg] = useState("")
    const [errorLogin, setErrorLogin] = useState('')

    const history = useHistory()

    // useEffect(() => {
    //     setErrMsg(errMsg)
    //
    // }, [])

    function login() {
        const sendLoginData = {
            user: loginUser.current.value,
            password: loginPassword.current.value
        }
        if (sendLoginData.user.length === 0 || sendLoginData.password.length === 0) {
            return setErrorLogin("not found")
        }

        http.post('/loginUser', sendLoginData).then(res => {
            setData2(res)
            setError2(res.message)
            console.log(res)
            setGold(res.findUser.gold)
            setHealth(res.findUser.health)
            setImage(res.findUser.image)
            setName(res.findUser.username)

            localStorage.setItem("keyBase", res.findUser.secretKey)
            if (sendLoginData.password === "" && sendLoginData.user === "") {
                return setErrMsg("Fields are required")
            }
            if (sendLoginData.user && sendLoginData.password) {
                history.push('/gameMenu')
            }
        })
    }

    return (
        <div className="registerBox">
            <input ref={loginUser} style={{margin: '5px'}} type="text" placeholder="username"/>
            <input ref={loginPassword} style={{margin: '5px'}} type="text" placeholder="password"/>
            <div>{error2}</div>
            <button style={{margin: '5px'}} onClick={login}>login</button>
            <div style={{display: "none"}}>{errorLogin}</div>
        </div>
    );
};

export default LoginUser;