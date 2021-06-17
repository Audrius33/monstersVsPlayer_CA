import React from 'react';
import {useHistory} from "react-router-dom"


function LeaderBoard(props) {

    const history = useHistory()

    function goToMenu() {
        history.push('/gameMenu')
    }

    return (
        <div>
            <h4>
                LeaderBoard
            </h4>
            <button onClick={goToMenu}>Back to Menu</button>
        </div>
    );
}

export default LeaderBoard;