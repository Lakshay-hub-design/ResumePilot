const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')

async function authUser(req, res, next){
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message: "Token not provided"
            })
        }

        const isTokenBlacklisted = await blacklistModel.findOne({
            token
        })

        console.log(isTokenBlacklisted);

        if(isTokenBlacklisted){
            return res.status(401).json({
                message: "token is invalid"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
}

module.exports = {
    authUser
}