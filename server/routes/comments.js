import express from "express";
import { getComments, getUserComments, deleteComment, createComment, deleteComments, getSearchComments, getReplies, getComment, editComment } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:postId/comments", verifyToken, getComments);
router.get("/:commentId", verifyToken, getComment);
router.get("/:userId/user/comments", verifyToken, getUserComments);
router.get("/search/:query", verifyToken, getSearchComments);
// router.post("/", verifyToken, createComment);

/* UPDATE */
router.patch("/:commentId/edit", verifyToken, editComment);

router.delete("/:commentId/delete", verifyToken, deleteComment);
router.delete("/:postId/comments/delete", verifyToken, deleteComments);

export default router;
