import jwt from 'jsonwebtoken';
import logger from "../config/logger.js";


const JWT_SECRET = process.env.JWT_SECRET || 'Secret-key/change-in-Production';
const JWT_EXPIRE ="1d";

export const jwttoken={
    sign:(payload) => {
        try {
            return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
        }catch (e){
            logger.error("auth failed to authenticate with JWT: %s", e);
            throw e;
        }
    },
    verify:(token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        }catch(e) {
            logger.error("auth failed to authenticate with JWT: %s", token);
            throw e;
        }


    }
}