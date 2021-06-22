import React, {useRef, useState} from 'react';
import http from "../Plugins/Fetch";

function RegisterUser() {

    const [data, setData] = useState([])
    const [error, setError] = useState([])


    const userNameRef = useRef()
    const passwordRef1 = useRef()
    const passwordRef2 = useRef()

    function inputData() {
        const sendInputData = {
            username: userNameRef.current.value,
            password1: passwordRef1.current.value,
            password2: passwordRef2.current.value
        }
        http.post('/registerUser', sendInputData).then(res => {
            setData(res)
            setError(res.message)
        })
    }


    return (
        <div className="registerBox">
            <input style={{margin: '5px'}} ref={userNameRef} type="text" placeholder="username"/>
            <input style={{margin: '5px'}} ref={passwordRef1} type="password" placeholder="Password"/>
            <input style={{margin: '5px'}} ref={passwordRef2} type="password" placeholder="Confirm Password"/>
            <h5 className="errorStyle" style={{color: "white"}}>{error}</h5>
            <button style={{margin: '5px'}} onClick={inputData}>Register</button>
        </div>
    );
}

export default RegisterUser;