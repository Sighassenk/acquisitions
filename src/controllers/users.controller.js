import logger from "../config/logger.js";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../services/users.services.js";

export const fetchAllUsers = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();

        res.status(200).json({
            message: "Users retrieved successfully",
            users: allUsers,
            count: allUsers.length,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const fetchUserById = async (req, res, next) => {
    try {
        const user = await getUserById(Number(req.params.id));

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const storeUser = async (req, res, next) => {
    try {
        const user = await createUser(req.body);

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const editUser = async (req, res, next) => {
    try {
        const user = await updateUser(
            Number(req.params.id),
            req.body
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const destroyUser = async (req, res, next) => {
    try {
        const user = await deleteUser(Number(req.params.id));

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};