import express from "express";
import { getPost, getFeedPosts, getUserPosts, upvotePost, downvotePost, deletePost, getFilteredPosts, editPost, getSearchPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:postId", verifyToken, getPost);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/order/:filter", verifyToken, getFilteredPosts);
router.get("/search/:query", verifyToken, getSearchPosts);

/* UPDATE */
router.patch("/:postId/upvote", verifyToken, upvotePost);
router.patch("/:postId/downvote", verifyToken, downvotePost);
router.patch("/:postId/edit", verifyToken, editPost);


router.delete("/:postId/delete", verifyToken, deletePost);

export default router;
