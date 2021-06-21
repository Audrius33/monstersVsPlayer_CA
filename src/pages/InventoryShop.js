import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom"
import "./GameArena.css"
import http from '../Plugins/Fetch'


function InventoryShop({gold, setGold}) {

    let weapons = [
        {
            name: "sword",
            img: "https://images-na.ssl-images-amazon.com/images/I/51b3vLrL7JL._AC_UL1000_.jpg",
            damage: 8,
            effect: "has 20% chance to block enemy attack",
            price: 40,
            sellPrice: 5,
            type: "weapons"
        },
        {
            name: "magic Wand",
            img: "https://netrinoimages.s3.eu-west-2.amazonaws.com/2020/12/31/788295/343333/mushoku_tensei_rudeus_wand_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3590453_o.png",
            damage: 5,
            effect: "has 40% chance to heal hero on enemy attack by 10hit points",
            price: 1000,
            sellPrice: 400,
            type: "weapons"

        },
        {
            name: "bow",
            img: "https://img-new.cgtrader.com/items/626437/1022e9cae4/bow-and-arrow-3d-lowpoly-game-model-weapon-game-ready-bow-suit-3d-model-low-poly-max-obj-fbx-tga.png",
            damage: 6,
            effect: "has 30% chance to do double damage",
            price: 300,
            sellPrice: 80,
            type: "weapons"

        }

    ]

    let armor = [
        {
            img: "https://cdna.artstation.com/p/assets/images/images/001/087/898/medium/kuchu-pack-ninja-color.jpg?1439799168",
            defence: 3,
            price: 50,
            sellPrice: 10,
            type: "weapons"

        },
        {
            img: "https://i.pinimg.com/originals/d4/2c/39/d42c398eebe94518c3ee87513176c680.png",
            defence: 7,
            price: 250,
            sellPrice: 100,
            type: "weapons"

        },
        {
            img: "https://i.pinimg.com/originals/8f/42/59/8f4259b43b5e419a9923cc4eb051cfcf.jpg",
            defence: 8,
            price: 800,
            sellPrice: 300,
            type: "weapons"

        }

    ]

    let potion = [
        {
            img: "https://i.pinimg.com/originals/99/03/f7/9903f78835125b686c6bacec9943b69f.jpg",
            heals: 20,
            price: 10,
            sellPrice: 5,
            type: "potion"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bq7GI7Qv5oLACeYN8HWdP6qfipDJLNY1uA&usqp=CAU",
            heals: 35,
            price: 30,
            sellPrice: 10,
            type: "potion"

        },
        {
            img: "https://cdna.artstation.com/p/assets/images/images/028/446/162/medium/marko-bogush-vch.jpg?1594499646",
            heals: 50,
            price: 60,
            sellPrice: 20,
            type: "potion"
        }

    ]

    const history = useHistory()

    function goToMenu() {
        history.push('/gameMenu')
    }

    function buyWeapon(index) {
        const sendWeaponId = weapons[index]
        localStorage.getItem("keyBase")
        const sendData = {
            weapon: sendWeaponId,
            key: localStorage.getItem("keyBase")
        }
        http.post('/buyWeapon', sendData).then(res => {
            setGold(res.updatedUser.gold)
        })
    }

    function buyArmor(index2) {
        const sendArmorId = armor[index2]
        localStorage.getItem("keyBase")
        const sendData = {
            armor: sendArmorId,
            key: localStorage.getItem("keyBase")
        }
        http.post('/buyArmor', sendData).then(res => {
            setGold(res.updatedUser2.gold)
        })
    }

    function buyPotion(index3) {
        const sendPotionId = potion[index3]
        localStorage.getItem("keyBase")
        const sendData = {
            potion: sendPotionId,
            key: localStorage.getItem("keyBase")
        }

        http.post('/buyPotion', sendData).then(res => {
            setGold(res.updatedUser2.gold)
        })
    }

    return (
        <div>
            <h4>Your Gold: {gold}</h4>
            <button onClick={goToMenu}>Back to Menu</button>
            <h4>Buy Weapons, Armors and potions</h4>
            <div className="weapons">
                {weapons.map((item, index) =>
                    <div className="weaponBox" key={index}>
                        <img className="weaponsImgSize" src={item.img} alt=""/>
                        <h3>Damage: {item.damage}</h3>
                        <h5>Effect: {item.effect}</h5>
                        <div>
                            <button className="m-5" onClick={() => buyWeapon(index)}>buy: {item.price}</button>
                        </div>

                    </div>)}
            </div>
            <div className="armors">
                {armor.map((item, index2) =>
                    <div className="armorBox" key={index2}>
                        <img className="armorsImgSize" src={item.img} alt=""/>
                        <h3>Defence: {item.defence}</h3>
                        <div>
                            <button className="m-5" onClick={() => buyArmor(index2)}>buy: {item.price}</button>
                        </div>
                    </div>)}
            </div>
            <div className="potion">
                {potion.map((item, index3) =>
                    <div className="potionBox" key={index3}>
                        <img className="potionImgSize" src={item.img} alt=""/>
                        <h3>Heals: {item.heals} hp</h3>
                        <div>
                            <button className="m-5" onClick={() => buyPotion(index3)}>buy: {item.price}</button>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}

export default InventoryShop;