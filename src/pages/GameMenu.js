import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"


const GameMenu = ({gold, health, name,setName}) => {



    const history = useHistory()


    useEffect(() => {
        setName(name)

    }, [])

    function logClientOut() {
        window.localStorage.removeItem('keyBase');
        history.push('/')
    }

    function goToArena() {
        history.push('/Arena')
    }
    function goToInventory() {
        history.push('/InventoryShop')

    }
    function goToLeaderBoard() {
        history.push('/LeaderBoard')
    }
    function goToShop() {
        history.push('/UserInventory')
    }

    return (
        <div className="menuStyle">
            <h5>User: {name}</h5>
            <button className="logOutBtn" onClick={logClientOut}>Log Out</button>
            <h3>Game menu</h3>
            <div className="d-flex">
                <h4 className="m-5" >Gold: {gold}</h4>
                <h4 className="m-5">Health: {health}</h4>
            </div>

            <div className="menuList">
                <div className="menuItem"><p className="menuListBtn" onClick={goToArena}>Arena</p></div>
                <div className="menuItem"><p className="menuListBtn" onClick={goToInventory}>Inventory Shop</p></div>
            </div>
            <div className="menuList">
                <div className="menuItem"><p className="menuListBtn" onClick={goToLeaderBoard}>Leader Board</p></div>
                <div className="menuItem"><p className="menuListBtn" onClick={goToShop}>User Inventory</p></div>
            </div>
        </div>
    );
};

export default GameMenu;