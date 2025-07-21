const { signup,login } = require('../controllers/AuthController')
const { signupValidation, LoginValidation } = require('../middlewares/AuthValidation')

const router=require('express').Router();

router.post('/signup',signupValidation,signup)
router.post('/login',LoginValidation,login)

module.exports=router