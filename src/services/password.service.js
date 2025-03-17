import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword
}

export const verifyPassword = async (hashedPassword, password) => {
    const isVerified = await bcrypt.compare(password, hashPassword)
    return isVerified
}