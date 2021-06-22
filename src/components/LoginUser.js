import React, {useEffect, useRef, useState} from 'react';
import http from "../Plugins/Fetch";
import {useHistory} from "react-router-dom"


const LoginUser = ({setGold, setHealth, setImage, setName, gold}) => {
    const loginUser = useRef()
    const loginPassword = useRef()

    const [data2, setData2] = useState([])
    const [error2, setError2] = useState(true)
    const [errMsg, setErrMsg] = useState(true)
    const [errorLogin, setErrorLogin] = useState(true)
    const [error3, setError3] = useState(true)

    const history = useHistory()

    useEffect(() => {
        const timeId = setTimeout(() => {
            setErrorLogin(false)

        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    useEffect(() => {
        const timeId = setTimeout(() => {

            setError2(false)
            setError3(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    function login() {
        const sendLoginData = {
            user: loginUser.current.value,
            password: loginPassword.current.value
        }

        if (sendLoginData.user.length === 0 || sendLoginData.password.length === 0) {
           setErrorLogin("Fields are required")
        }
        http.post('/loginUser', sendLoginData).then(res => {
            setError2(res.message)
            if (res.error === true) {
                return setError3("user was not found")
                setErrorLogin(false)
            }
            setData2(res)
            setGold(res.findUser.gold)
            setHealth(res.findUser.health)
            setImage(res.findUser.image)
            setName(res.findUser.username)
            localStorage.setItem("keyBase", res.findUser.secretKey)
            if (sendLoginData.user && sendLoginData.password) {
                history.push('/gameMenu')
            }
        })
    }

    return (
        <div className="registerBox">
            <input ref={loginUser} style={{margin: '5px'}} type="text" placeholder="username"/>
            <input ref={loginPassword} style={{margin: '5px'}} type="text" placeholder="password"/>
            <button style={{margin: '5px'}} onClick={login}>login</button>
            <h4 style={{color: "red"}}>{errorLogin}</h4>
            <h4 style={{color: "red"}}>{error3}</h4>
            <h4 style={{color: "red"}}>{error2}</h4>
        </div>
    );
};

export default LoginUser;