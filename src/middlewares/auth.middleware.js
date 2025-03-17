import jwt from "jsonwebtoken";
import env from "dotenv";

env.config()

let ACCESS_SECRET = process.env.ACCESS_SECRET
let REFRESH_SECRET = process.env.REFRESH_SECRET

export const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization?.split(" ")[1]
    if (!authHeader) {
        return res.status(403).json({message: "token not found"})
    }

    jwt.verify(authHeader, ACCESS_SECRET, (err, user)=>{
        if(err){
            return res.status(500).json({message: "unauthorized access"})
        }
        req.user = user
        next()
    })   
}

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.refreshtoken
    if (!authHeader) {
        return res.status(403).json({message: "token not found"})
    }

    jwt.verify(authHeader, REFRESH_SECRET, (err, user)=>{
        if(err){
            return res.status(500).json({message: "unauthorized access"})
        }
        req.user = user
        next()
    })   
}