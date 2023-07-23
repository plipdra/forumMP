import express from "express";
import { getPost, getFeedPosts, getUserPosts, upvotePost, downvotePost, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:postId", verifyToken, getPost);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:postId/upvote", verifyToken, upvotePost);
router.patch("/:postId/downvote", verifyToken, downvotePost);


router.delete("/:postId/delete", verifyToken, deletePost);

export default router;
