const usersDb = require('../schemas/UserSchema')
const bcrypt = require('bcrypt')
const saltRounds = 10
let randomId = require('random-id');


module.exports = {
    saveUser: async (req, res) => {
        const {
            username,
            password1,
            password2
        } = req.body

        let passwordHash
        const findUser = await usersDb.findOne({username: username})
        if (!!findUser) {
            return res.send({success: false, message: "User already exists"})
        }

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(password1, salt, function (err, hash) {
                passwordHash = hash
                if (err) return next(err);
                const users = new usersDb
                users.password1 = hash
                users.username = username
                users.secretKey = username
                users.password1 = passwordHash
                users.password2 = password2
                users.health = 100
                users.gold = 10000
                users.inventory = []
                users.image = "https://streetfighter.com/wp-content/uploads/2015/10/facebook-featured.jpg"
                users.save().then(data => {
                    res.send({success: false, message: "A user account was created"})
                })


            })

        })
    },
    findUser: async (req, res) => {
        const {
            user,
            password
        } = req.body

        let passwordHash

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(password, salt, async function (err, hash) {
                passwordHash = hash
                const findUser = await usersDb.findOne({username: user})

                if (err) return next(err);
                bcrypt.compare(password, findUser.password1, function (err, resSend) {
                    if (resSend) {
                        res.send({success: true, username: user, findUser})
                    } else {
                        res.send({success: false,})
                    }
                });
            })
        })
    },
    findInfo: async (req, res) => {
        const findUser = await usersDb.findOneAndUpdate({secretKey: req.params.key})
        res.send({success: true, findUser})
    },
    buyWeapon: async (req, res) => {
        const data = req.body.weapon
        data.id = randomId(10, 'aA0')
        const key = req.body.key
        const findUser = await usersDb.findOne({username: key})
        let updatedUser
        if (findUser.gold >= data.price) {
            updatedUser = await usersDb.findOneAndUpdate(
                {username: key}, {
                    $set: {gold: findUser.gold - data.price},
                    $push: {inventory: data}
                }, {
                    new: true,
                })
        }
        res.send({success: true, updatedUser})

    },
    sellWeapon: async (req, res) => {

        const data = req.body.item
        const key = req.body.key
        const findUser = await usersDb.findOne({username: key})
        let updatedUser
        updatedUser = await usersDb.findOneAndUpdate(
            {username: key}, {
                $set: {gold: findUser.gold + (data.sellPrice)},
                $pull: {inventory: {id: data.id}}
            }, {
                new: true,
            })

        res.send({success: true, updatedUser})
    },
    getWeapons: async (req, res) => {
        const key = req.params.key
        const findUser = await usersDb.findOne({username: key})
        res.send({findUser})
    },
    buyArmor: async (req, res) => {
        const data2 = req.body.armor
        data2.id = randomId(10, 'aA0')
        const key = req.body.key
        const findUser2 = await usersDb.findOne({username: key})
        let updatedUser2
        if (findUser2.gold >= data2.price) {
            updatedUser2 = await usersDb.findOneAndUpdate(
                {username: key}, {
                    $set: {gold: findUser2.gold - data2.price},
                    $push: {inventory: data2}
                }, {
                    new: true,
                })
        }
        res.send({success: true, updatedUser2})
    },
    buyPotion: async (req, res) => {
        const data3 = req.body.potion
        data3.id = randomId(10, 'aA0')
        const key = req.body.key
        const findUser2 = await usersDb.findOne({username: key})
        let updatedUser2
        if (findUser2.gold >= data3.price) {
            updatedUser2 = await usersDb.findOneAndUpdate(
                {username: key}, {
                    $set: {gold: findUser2.gold - data3.price},
                    $push: {inventory: data3}
                }, {
                    new: true,
                })
        }
        res.send({success: true, updatedUser2})
    },

}