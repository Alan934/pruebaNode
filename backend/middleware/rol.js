const { handleHttpError } = require("../utils/handleError")

const checkRol = (roles) => (req, res, next) => {
    try {
        const user = req.user
        const rolesByUser = user.role
        
    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if(!checkValueRol){
            handleHttpError(req, "User_Not_Permissions", 403)
            return
        }
        next()
    } catch (error) { 
       handleHttpError(res, "Error_Permissions", 403) 
    }
}   

module.exports = checkRol