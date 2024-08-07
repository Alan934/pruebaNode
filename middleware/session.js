const {handleHttpError} = require('../utils/handleError')
const {verifyToken} = require('../utils/handleJwt')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "Not_Token", 401)
            return
        }
        
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if(!dataToken.id){
            handleHttpError(res, "Error_Id_Token", 401)
            return
        }

        const user = await User.findByPk(dataToken.id)
        req.user = user 

        next()

    } catch (error) {
        handleHttpError(res, 'Not_Session', 401)
    }
}

module.exports = {authMiddleware}