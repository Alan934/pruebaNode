const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => {
    const sign = jsonwebtoken.sign({
        id: user.id,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn:"2h"
    }
    )
    return sign
}

const verifyToken = async (tokenJwt) => {
    try{
        return jsonwebtoken.verify(tokenJwt, JWT_SECRET)
    }catch(e){
        return null
    }
}

module.exports = {tokenSign, verifyToken}