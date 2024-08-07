const {check} = require('express-validator')
const ValidateResults = require('../utils/handleValidator')

const validatorRegister = [
    check('name').exists().notEmpty().isLength({min:3, max:20}),
    check('age').exists().notEmpty().isNumeric(),
    check('password').exists().notEmpty().isLength({min:3, max:20}),
    check('email').exists().notEmpty().isEmail(),
    (req, res, next) => {
        return ValidateResults(req, res, next)
    }
]

const validatorLogin = [
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({min:3, max:20}),
    (req, res, next) => {
        return ValidateResults(req, res, next)
    }
]

module.exports = {validatorRegister, validatorLogin} 

