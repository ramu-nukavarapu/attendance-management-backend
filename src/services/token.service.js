import jwt from "jsonwebtoken";
import env from "dotenv";

env.config()

let ACCESS_SECRET = process.env.ACCESS_SECRET
let REFRESH_SECRET = process.env.REFRESH_SECRET

export const accessToken = (payload) => {
    const token = jwt.sign(payload, SECRET, {expiresIn: "15m"});
    return token;
}

export const refreshToken = (payload) => {
    const token = jwt.sign(payload, SUPER_SECRET, {expiresIn: "7d"});
    return token;
}