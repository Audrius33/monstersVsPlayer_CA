import './App.css';
import RegisterUser from './components/RegisterUser'
import LoginUser from "./components/LoginUser";
import GameMenu from './pages/GameMenu'
import GameArena from "./pages/GameArena";
import InventoryShop from "./pages/InventoryShop";
import LeaderBoard from "./pages/LeaderBoard";
// import UserInventory from "./pages/UserInventory";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import http from "./Plugins/Fetch";
import UserInventory from "./pages/UserInventory";

function App() {

    const [gold, setGold] = useState(0)
    const [health, setHealth] = useState(0)
    const [getImage, setImage] = useState([])
    const [getInventory, setInventory] = useState([])
    const [getWeapons, setWeapons] = useState([])
    const [buyWeaponMsg, setBuyWeaponMsg] = useState('')


    useEffect(() => {
        if (!!localStorage.getItem("keyBase")) {

            http.get('/getInfo/' + localStorage.getItem("keyBase")).then(res => {

                setInventory(res.findUser.inventory)
                setImage(res.findUser.image)
                setHealth(res.findUser.health)
                setGold(res.findUser.gold)
                setWeapons(res.findUser.inventory)
            })
        }


    }, [])

    return (
        <div className="App">
            <Router>
                <div className="App">
                    <div className="d-flex">
                        <Link className="style-link" to="/Login">Login</Link>
                        <Link className="style-link" to="/RegisterUser">Register</Link>
                        <Link className="style-link" to="/gameMenu"></Link>
                        <Link className="style-link" to="/Arena"></Link>
                        <Link className="style-link" to="/InventoryShop"></Link>
                        <Link className="style-link" to="/LeaderBoard"></Link>
                        <Link className="style-link" to="/UserInventory"></Link>
                    </div>

                    <Switch>
                        <Route path="/Login">
                            <LoginUser
                                setGold={setGold}
                                setHealth={setHealth}
                                setImage={setImage}
                            />
                        </Route>
                        <Route path="/RegisterUser">
                            <RegisterUser/>
                        </Route>
                        <Route path="/gameMenu">
                            <GameMenu
                                gold={gold}
                                health={health}

                            />
                        </Route>
                        <Route path="/Arena">
                            <GameArena
                                getImage={getImage}
                                health={health}
                                gold={gold}
                                getInventory={getInventory}
                                setGold={setGold}
                                setInventory={setInventory}
                                setWeapons={setInventory}
                                setBuyWeaponMsg={setBuyWeaponMsg}
                                buyWeaponMsg={buyWeaponMsg}
                                setHealth={setHealth}
                            />
                        </Route>
                        <Route path="/InventoryShop">
                            <InventoryShop
                                gold={gold}
                                setGold={setGold}
                                setWeapons={setWeapons}
                            />
                        </Route>
                        <Route path="/LeaderBoard">
                            <LeaderBoard/>
                        </Route>
                        <Route path="/UserInventory">
                            <UserInventory
                                setInventory={setInventory}
                                setWeapons={setInventory}
                                getInventory={getInventory}
                                gold={gold}
                                setGold={setGold}
                                // setWeapons={setWeapons}

                            />
                        </Route>
                    </Switch>

                </div>
            </Router>
        </div>
    );
}

export default App;
