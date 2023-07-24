import express from "express";
import { getComments, getUserComments, deleteComment, createComment, deleteComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:postId/comments", verifyToken, getComments);
router.get("/:userId/user/comments", verifyToken, getUserComments);

// router.post("/", verifyToken, createComment);

/* UPDATE */


router.delete("/:commentId/delete", verifyToken, deleteComment);
router.delete("/:postId/comments/delete", verifyToken, deleteComments);

export default router;
