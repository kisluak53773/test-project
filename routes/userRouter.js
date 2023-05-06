const Router = require('express')
const router = new Router()
const {registration,login,auth} = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, auth)

module.exports=router