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

    let helpers = {
        randomNum(num) {
            return Math.round(Math.random() * num)
        },
    }


    const [playerPercent, playerSetPercent] = useState(100)
    const [enemyPercent, enemySetPercent] = useState(100)
    const [getEnemyHp, setEnemyHp] = useState(100)
    const [currentEnemy, SetCurrentEnemy] = useState(0)
    const [endGame, setEndGame] = useState("")
    const [disable, setDisable] = useState(false);

    const history = useHistory()

    function goToMenu() {
        history.push('/gameMenu')
    }

    useEffect(() => {

        http.get('/getWeapons/' + localStorage.getItem("keyBase")).then(res => {
            setInventory(res.findUser.inventory)
        })
        setInventory(getInventory)

    }, [])

    useEffect(() => {
        let changeEnemy = helpers.randomNum(3)
        console.log(changeEnemy)
        console.log(getEnemyHp)
        if (getEnemyHp <= 0) {
            console.log("change enemy")
            console.log(Enemies)
            SetCurrentEnemy(Enemies[changeEnemy].image)
            setEnemyHp(100)
            enemySetPercent(100)
        }
    }, [])


    function armorDefence() {
        let defence = 0
        for (let i = 0; i < getInventory.length; i++) {
            if (getInventory[i].defence === 8) {

                let defenceNumber = getInventory[i].defence
                let randomDefence = helpers.randomNum(defenceNumber)

                defence = randomDefence
            }
            if (getInventory[i].defence === 3) {

                let defenceNumber = getInventory[i].defence
                let randomDefence = helpers.randomNum(defenceNumber)

                defence = randomDefence

            }
            if (getInventory[i].defence === 7) {
                let defenceAgainstEnemy = getInventory[i].defence
                let defenceNumber = getInventory[i].defence
                let randomDefence = helpers.randomNum(defenceNumber)
                defence = randomDefence
            }
        }
        return defence
    }

    function damageToEnemy() {

        if (getInventory[0].name === "magic Wand") {
            let wandDmg = getInventory[0].damage
            let dmgPlayerDone = helpers.randomNum(wandDmg)
            setEnemyHp(getEnemyHp - dmgPlayerDone)
            enemySetPercent(enemyPercent - dmgPlayerDone)

        }
        if (getInventory[0].name === "sword") {

            let swordDmg = getInventory[0].damage
            let dmgPlayerDone2 = helpers.randomNum(swordDmg)
            setEnemyHp(getEnemyHp - dmgPlayerDone2)
            console.log(getEnemyHp - dmgPlayerDone2)
            enemySetPercent(enemyPercent - dmgPlayerDone2)
        }
        if (getInventory[0].name === "bow") {
            let bowDmg = getInventory[0].damage
            let dmgPlayerDone3 = helpers.randomNum(bowDmg)
            setEnemyHp(getEnemyHp - dmgPlayerDone3)
            enemySetPercent(enemyPercent - dmgPlayerDone3)
            let doubleDmgToEnemy = helpers.randomNum(100)
            if (doubleDmgToEnemy <= 30) {
                setEnemyHp(getEnemyHp - dmgPlayerDone3 * 2)
            }
        }
    }

    function damageToPlayer() {
        let dmgEnemyDone = helpers.randomNum(Enemies[currentEnemy].damage)
        console.log(currentEnemy)
        dmgEnemyDone -= armorDefence()
        playerSetPercent(playerPercent - dmgEnemyDone)
        setHealth(health - dmgEnemyDone)

        if (health - dmgEnemyDone <= 0) {
            setEndGame("Game Over")
            setDisable(true)

        }
        http.post('/updatePlayerHp', {
            health: health - dmgEnemyDone,
            healthBar: playerPercent - dmgEnemyDone,
            key: localStorage.getItem("keyBase")
        }).then(res => {

        })
        if (getInventory[0].name === "bow") {

        }
        if (getInventory[0].name === "magic Wand") {

            let healPlayerByChance = helpers.randomNum(100)
            if (healPlayerByChance <= 40) {
                setHealth(health + 10)
                playerSetPercent(playerPercent + 10)
            }
        }
        if (getInventory[0].name === "sword") {
            let chanceToBlockAttack = helpers.randomNum(100)
            if (chanceToBlockAttack < 20) {
                setHealth(health - 0)
                playerSetPercent(playerPercent - 0)
            }
        }
    }

    function attack() {
        damageToEnemy()
        setTimeout(() => {
            damageToPlayer()
        }, 500)
        setGold(gold + helpers.randomNum(10))
    }

    function use(item) {

        localStorage.getItem("keyBase")
        const sendData = {
            potion: item,
            key: localStorage.getItem("keyBase")
        }
        http.post('/usePotion', sendData).then(res => {
            setHealth(res.updateUser.health)
        })
    }

    return (
        <div className="arenaZone">
            <h4 style={{color: "white"}}>
                Game arena
            </h4>
            <button onClick={goToMenu}>Back to Menu</button>
            <div className="arena">
                <div className="playerZone">
                    <img className="imageSize" src={getImage} alt=""/>
                    <div className="healthBarPlayer"
                         style={{background: `linear-gradient(90deg, rgba(13,199,34,1) ${playerPercent}%, rgba(228,220,220,1) ${playerPercent}%)`}}>
                        <div className="playerHp">hp: {health}</div>

                    </div>
                </div>

                <div className="attackZone" style={{color: "white"}}>
                    {getInventory.length > 0 ? null : "BUY WEAPON"}
                    <button
                        style={{margin: "5px"}}
                        onClick={attack}
                        disabled={disable || getInventory.length === 0}

                    >Attack
                    </button>
                    <h4 className="endGame" style={{color: "red"}}>{endGame}</h4>
                </div>
                <div className="enemyZone">

                    <img className="imageSize" src={Enemies[currentEnemy].image} alt=""/>
                    <div className="healthBar" className="healthBar"
                         style={{background: `linear-gradient(90deg, rgba(13,199,34,1) ${enemyPercent}%, rgba(228,220,220,1) ${enemyPercent}%)`}}>
                        <div className="enemyHp">hp: {getEnemyHp}</div>
                    </div>
                </div>
            </div>
            <h4 className="m-5" style={{color: "white"}}>
                gold: {gold}
            </h4>
            <div className="showInventory"> {!!getInventory ?
                <div className="d-flex">
                    {getInventory.map((item, index) => {
                            if (item.type === "potion") {
                                return <div key={index} style={{display: "flex", flexDirection: "column"}}>
                                    <img className="potionImgSize m-5" src={item.img} alt=""/>
                                    <button onClick={() => use(item)}>use Potion</button>
                                </div>
                            } else {
                                return <div key={index}>
                                    <img className="potionImgSize m-5" src={item.img} alt=""/>
                                </div>
                            }
                        }
                    )}
                </div>
                : null}
            </div>
        </div>
    );
}

export default GameArena;