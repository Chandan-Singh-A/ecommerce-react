const jwt = require("jsonwebtoken")

const isAuth = (req,res,next)=>{
    try {
        if(!req.cookies){
            res.status(401).json({msg:"Unauthorised access"})
        }
        const decode = jwt.verify(req.cookie,process.env.JWT_SECRET)
        req.auth = {...decode}
    } catch (error) {
        res.status(401).json({msg:"Unauthorised access"})
    }
}

module.exports = isAuth