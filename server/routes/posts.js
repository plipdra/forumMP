import express from "express";
import { getFeedPosts, getUserPosts, upvotePost, downvotePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:postId/upvote", verifyToken, upvotePost);
router.patch("/:postId/downvote", verifyToken, downvotePost);

export default router;
