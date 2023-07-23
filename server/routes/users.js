import express from "express";
import {
    getUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

// router.delete("/:userId/delete", verifyToken, deleteUser); // not yet implemented

export default router;
