import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom"
import http from "../Plugins/Fetch";


function UserInventory({setInventory, getInventory, gold, setWeapons, setGold}) {

    const history = useHistory()

    function goToMenu() {
        history.push('/gameMenu')
    }

    useEffect(() => {
        http.get('/getWeapons/' + localStorage.getItem("keyBase")).then(res => {
            setInventory(res.findUser.inventory)
        })
    }, [])

    function sellItem(item) {

        const sendData = {
            item: item,
            key: localStorage.getItem("keyBase")
        }
        http.post('/sellWeapon', sendData).then(res => {
            setWeapons(res.updatedUser.inventory)
            setGold(res.updatedUser.gold)
        })
    }

    return (
        <div>
            <h4 style={{color: "white"}}>
                User Inventory
            </h4>
            <button onClick={goToMenu}>Back to Menu</button>
            <h4 className="m-5" style={{color: "white"}}>
                gold: {gold}
            </h4 >
            <div style={{color: "white"}} className="showInventory">
                {getInventory.map((item, index) =>
                    <div key={index} style={{margin: "auto"}}>
                        <img className="potionImgSize m-5" src={item.img} alt=""/>
                        <h3>Damage: {item.damage}</h3>
                        <h5>Effect: {item.effect}</h5>
                        <button className="m-5" onClick={() => sellItem(item)}>sell: {item.sellPrice}</button>

                    </div>
                )}
            </div>

        </div>
    );
}

export default UserInventory;