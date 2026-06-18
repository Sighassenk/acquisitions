import logger from "../config/logger.js";
import { db } from "../config/database.js";
import { users } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
    try {
        return await db.select().from(users);
    } catch (error) {
        logger.error("Error getting users", error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, id));

        return user;
    } catch (error) {
        logger.error("Error getting user", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const [user] = await db
            .insert(users)
            .values(userData)
            .returning();

        return user;
    } catch (error) {
        logger.error("Error creating user", error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const [user] = await db
            .update(users)
            .set({
                ...userData,
                updatedAt: new Date(),
            })
            .where(eq(users.id, id))
            .returning();

        return user;
    } catch (error) {
        logger.error("Error updating user", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const [user] = await db
            .delete(users)
            .where(eq(users.id, id))
            .returning();

        return user;
    } catch (error) {
        logger.error("Error deleting user", error);
        throw error;
    }
};