import React, {useRef, useState, useEffect} from 'react';
import './GameArena.css'
import http from '../Plugins/Fetch'

import {useHistory} from "react-router-dom"


function GameArena({
                       getImage,
                       health,
                       gold,
                       getInventory,
                       setGold,
                       setWeapons,
                       getWeapons,
                       setInventory,
                       setBuyWeaponMsg,
                       buyWeaponMsg,
                       setHealth,
                   }) {

    const Enemies = [
        {
            name: "Goblin",
            image: "https://i.imgur.com/yBh7Fn4.png",
            damage: 12
        },
        {
            name: "Troll",
            image: "https://i.pinimg.com/originals/8d/7f/d8/8d7fd8ae9fcd6060497c628e1c7944b4.jpg",
            damage: 8
        },
        {
            name: "Witch",
            image: "https://i.pinimg.com/originals/c0/da/c0/c0dac0da46b4c59534cf898b1967d523.png",
            damage: 15
        }
    ]


    const [getHpCounter, setHpCounter] = useState(0)
    const [playerPercent, playerSetPercent] = useState(100)
    const [enemyPercent, enemySetPercent] = useState(100)
    const [getEnemyHp, setEnemyHp] = useState(100)
    const [currentEnemy, SetCurrentEnemy] = useState(0)


    const history = useHistory()

    function goToMenu() {
        history.push('/gameMenu')
    }

    useEffect(() => {

        http.get('/getWeapons/' + localStorage.getItem("keyBase")).then(res => {
            setInventory(res.findUser.inventory)
            setHealth(res.findUser.health)
        })
        SetCurrentEnemy(currentEnemy)
        setInventory(getInventory)

    }, [])

    function attack() {

        if (getInventory[0].name === "magic Wand") {
            console.log("magic wand")
            let wandDmg = getInventory[0].damage
        }
        if (getInventory[0].name === "sword") {
            console.log("sword")
            let swordDmg = getInventory[0].damage

        }
        if (getInventory[0].name === "bow") {
            console.log("bow")
            let bowDmg = getInventory[0].damage
            console.log(getInventory[0].damage)
        }

        playerSetPercent(playerPercent - 8)
        enemySetPercent(enemyPercent - 10)
    }


    return (
        <div className="arenaZone">
            <h4>
                game arena
            </h4>
            <button onClick={goToMenu}>Back to Menu</button>
            <div className="arena">
                <div className="playerZone">
                    <img className="imageSize" src={getImage} alt=""/>
                    <div className="healthBar"
                         style={{background: `linear-gradient(90deg, rgba(13,199,34,1) ${playerPercent}%, rgba(228,220,220,1) ${playerPercent}%)`}}>
                        <div className="playerHp">hp: {health}</div>

                    </div>
                </div>
                <div className="attackZone">
                    {getInventory.length > 0 ? null : "BUY WEAPON"}
                    <button
                        style={{margin: "5px"}}
                        onClick={attack}
                        disabled={getInventory.length > 0 ? null : "buy weapon"}
                    >Attack
                    </button>
                </div>
                <div className="enemyZone">
                    <img className="imageSize" src={Enemies[0].image} alt=""/>
                    <div className="healthBar" className="healthBar"
                         style={{background: `linear-gradient(90deg, rgba(13,199,34,1) ${enemyPercent}%, rgba(228,220,220,1) ${enemyPercent}%)`}}>
                        <div className="enemyHp">hp: {getEnemyHp}</div>
                    </div>
                </div>
            </div>
            <div className="m-5">
                gold: {gold}
            </div>
            <div className="showInventory">
                {getInventory.map((item, index) =>
                    <div style={{margin: "auto"}} key={index}>
                        <img className="potionImgSize m-5" src={item.img} alt=""/>
                    </div>
                )}
            </div>


        </div>

    );
}

export default GameArena;