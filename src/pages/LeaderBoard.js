import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import http from "../Plugins/Fetch";
import '../App.css';


function LeaderBoard(props) {

    const [getPlayers, setPlayers] = useState([])

    const history = useHistory()

    function goToMenu() {
        history.push('/gameMenu')
    }

    useEffect(() => {
        http.post('/findUsers').then(res => {
            setPlayers(res.findAll)
        })
    }, [])

    return (
        <div>
            <h4 style={{color: "white"}}>
                LeaderBoard
            </h4>
            <button onClick={goToMenu}>Back to Menu</button>
            <div className="d-flex">
                <div>
                    {getPlayers.map((item, index) => {
                            return <div key={index}>
                                <div style={{color: "white"}}>
                                    <p className="borders">
                                        Player: {item.username}
                                    </p>
                                    <p className="borders">
                                        Gold: {item.gold}
                                    </p>
                                </div>
                            </div>
                        }
                    )}
                </div>
            </div>

        </div>
    );
}

export default LeaderBoard;