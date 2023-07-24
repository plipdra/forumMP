import express from "express";
import { getComments, getUserComments, deleteComment, createComment } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:postId/comments", verifyToken, getComments);
router.get("/:userId/user/comments", verifyToken, getUserComments);

// router.post("/", verifyToken, createComment);

/* UPDATE */


router.delete("/:commentId/delete", verifyToken, deleteComment);

export default router;
