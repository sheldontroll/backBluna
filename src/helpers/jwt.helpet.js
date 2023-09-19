import jwt from "jsonwebtoken"

export const secret = 'bluna123'


export const genJWT = (email) => {
    return jwt.sign({ email }, secret, { expiresIn: 3600 })
}