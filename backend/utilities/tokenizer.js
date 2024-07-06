const jwt = require('jsonwebtoken')
const makeToken = (userDetails)=>{
    try {
        const token = jwt.sign(userDetails,process.env.JWT_SECRET)
        return token
    } catch (error) {
        throw error
    }
}

module.exports = makeToken