const {matchedData} = require('express-validator')
const {encrypt, compare} = require('../utils/handlePassword')
const {tokenSign} = require('../utils/handleJwt')
const User = require('../models/User')
const {handleHttpError} = require('../utils/handleError')

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
    const passwordHash = await encrypt(req.password)
    const body = {...req, password:passwordHash}
    const dataUser = await User.create(body)
    dataUser.set('password', undefined, {strict: false})

    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }

    res.send({data:data})
    } catch (error) {
        handleHttpError(res, "Error register user")
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await User.findOne({
            where: { email: req.email },
            attributes: ['password', 'name', 'role', 'email', 'id']
        })
        
        if (!user) {
            handleHttpError(res, "El usuario no existe", 404);
            return;
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);
        
        if (!check) {
            handleHttpError(res, "Contraseña incorrecta", 401);
            return;
        }
        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user
        };

        res.send({ data });

    } catch (error) {
        console.log(error);
        handleHttpError(res, "Error login user");
    }
};

module.exports = {registerCtrl, loginCtrl}