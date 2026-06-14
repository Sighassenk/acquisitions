import logger from "../config/logger.js";
import  bcrypt from "bcrypt";
import {users} from "../models/user.model.js";
import {db} from "../config/database.js";
import { eq } from "drizzle-orm";
export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password,10);
    }catch(e) {
    logger.error("error in hashPassword");
    throw e;
    }
}

export const creatUser = async ({name, email, password, role = "user"}) => {
    try {
        const existingUser=db.select().from("users").where(eq(users.email,email)).limit(1);
        if (existingUser.length > 0) {
            throw new Error('User already exists');
        }
        const passwordHash = await hashPassword(password);

        const [newUser] = await db.insert(users).values({
            name,
            email,
            password: passwordHash,
            role
        }).returning({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
        });
        logger.info(
            `Successfully created user: ${newUser.email} (ID: ${newUser.id}, Role: ${newUser.role})`);
    return newUser;}
    catch(e) {
        logger.error(`error creating user: ${e}`);
        throw e;
    }
}