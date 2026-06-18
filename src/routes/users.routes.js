import express from "express";
import {
    fetchAllUsers,
    fetchUserById,
    storeUser,
    editUser,
    destroyUser,
} from "../controllers/users.controller.js";
const router = express.Router();

router.get("/", fetchAllUsers);
router.get("/:id", fetchUserById);
router.post("/", storeUser);
router.put("/:id", editUser);
router.delete("/:id", destroyUser);

export default router;