import React, {useRef, useState} from 'react';
import http from "../Plugins/Fetch";
import {useHistory} from "react-router-dom"


const LoginUser = ({setGold, setHealth, setImage}) => {
    const loginUser = useRef()
    const loginPassword = useRef()

    const [data2, setData2] = useState([])
    const [error2, setError2] = useState([])
    const [errMsg, setErrMsg] = useState("")


    const history = useHistory()

    function login() {
        const sendLoginData = {
            secretKey: localStorage.getItem("keyBase"),
            user: loginUser.current.value,
            password: loginPassword.current.value
        }

        http.post('/loginUser', sendLoginData).then(res => {
            setData2(res)
            setError2(res.message)
            setGold(res.findUser.gold)
            setHealth(res.findUser.health)
            setImage(res.findUser.image)

            localStorage.setItem("keyBase", res.username)
            console.log(localStorage.getItem("keyBase"))
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
        </div>
    );
};

export default LoginUser;