import express from "express";
import {
    editUser,
    getUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

router.patch("/:id/edit", verifyToken, editUser);

// router.delete("/:userId/delete", verifyToken, deleteUser); // not yet implemented

export default router;
