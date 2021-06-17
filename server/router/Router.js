const express = require('express')
const router = express.Router()
const ValidateUser = require('../middleware/ValidateUser')
const ValidateLoginUser = require('../middleware/ValidateLoginUser')
const controller = require('../controlers/Main')



router.post('/registerUser', ValidateUser.ValidateUser, controller.saveUser)
router.post('/loginUser', ValidateLoginUser.validateLogin, controller.findUser)
router.get('/getInfo/:key', controller.findInfo)
router.post('/buyWeapon', controller.buyWeapon)
router.post('/sellWeapon', controller.sellWeapon)
router.get('/getWeapons/:key', controller.getWeapons)
router.post('/buyArmor', controller.buyArmor)
router.post('/buyPotion', controller.buyPotion)


module.exports = router