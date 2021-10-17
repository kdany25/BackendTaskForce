import  jwt from "jsonwebtoken"

export const authenticatetoken =  (req , res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ') [1]

    if(token == null) return res.send({
        status : 401 ,
        message : " unauthorised access "
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err,user) => {
        console.log(user)
        if (user?.position !== 'MANAGER') {
            return res.send({
                status : 401 ,
                message : " unauthorised access "
            })
        }
        req.user = user
        if (err ) return res.sendStatus(403)
        next()
    })
}