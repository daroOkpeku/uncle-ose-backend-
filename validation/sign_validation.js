const {check, validationResult} = require('express-validator');


const signup_check = [
    check('fullname', 'This firstname is required and must have 15+').exists().isLength({min:15}),
    check('email', 'This email is required and must').exists().isEmail().normalizeEmail(),
    check('password', 'Password must be greater than 8 with symbol and a number').isLength({min:8, max:20}).matches(/^[A-Za-z0-9 #$@^&*.,'!&]+$/),
]

module.exports = {signup_check}