import Post from "../models/Post.js";
import User from "../models/User.js";

// TODO: ADD EDIT POST

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            title,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            votes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export const upvotePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isUpVoted = post.upvotes.get(userId);
        const isDownVoted = post.downvotes.get(userId);

        if (isUpVoted) {
            post.upvotes.delete(userId);
        } else if (isDownVoted) {
            post.downvotes.delete(userId);
            post.upvotes.set(userId, true);
        } else {
            post.upvotes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate (
            id, 
            { upvotes: post.upvotes },
            { new: true }
        );

        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const downvotePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isUpVoted = post.upvotes.get(userId);
        const isDownVoted = post.downvotes.get(userId);

        if (isDownVoted) {
            post.downvotes.delete(userId);
        } else if (isUpVoted) {
            post.upvotes.delete(userId);
            post.downvotes.set(userId, true);
        } else {
            post.downvotes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate (
            id, 
            { downvotes: post.downvotes },
            { new: true }
        );

        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

