import Post from "../models/Post.js";
import User from "../models/User.js";

// TODO: ADD EDIT POST

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, title, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            username: user.username,
            title,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            upvotes: {},
            downvotes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        console.log("here");
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getPost = async (req, res) => {
    console.log("GetPost");
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        res.status(200).json(post);
    } catch (err) {
        console.log("error in getPost");
        res.status(404).json({ message: err.message })
    }
}


export const getFeedPosts = async (req, res) => {
    console.log("getFeedPosts");
    try {
        const post = await Post.find();
        // console.log("Post Found", post)
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    console.log("getUserPosts");
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
    console.log("Reached upvotePost func")
    try {
        const { postId } = req.params;
        console.log("id check", postId);
        const { userId } = req.body;
        console.log("userid check", userId);
        const post = await Post.findById(postId);
        console.log("post check", post);
        const isUpVoted = post.upvotes.get(userId);
        console.log("upvote check", isUpVoted);
        const isDownVoted = post.downvotes.get(userId);
        console.log("downvote check", isDownVoted);

        console.log("before ifelse; ", "upvotes: ", post.upvotes, "downvotes: ", post.downvotes);

        if (isUpVoted) {
            console.log("went in if")
            post.upvotes.delete(userId);
        } else if (isDownVoted) {
            console.log("went in else if")
            post.downvotes.delete(userId);
            post.upvotes.set(userId, true);
        } else {
            console.log("went in else")
            post.upvotes.set(userId, true);
        }

        console.log("after ifelse; ", "upvotes: ", post.upvotes, "downvotes: ", post.downvotes);

        const updatedPost = await Post.findByIdAndUpdate (
            postId, 
            { upvotes: post.upvotes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log("error with upvotePost");
        res.status(404).json({ message: err.message })
    }
}

export const downvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log("id check", postId);
        const { userId } = req.body;
        console.log("userid check", userId);
        const post = await Post.findById(postId);
        console.log("post check", post);
        const isUpVoted = post.upvotes.get(userId);
        console.log("upvote check", isUpVoted);
        const isDownVoted = post.downvotes.get(userId);
        console.log("downvote check", isDownVoted);

        console.log("before ifelse; ", "upvotes: ", post.upvotes, "downvotes: ", post.downvotes);

        if (isDownVoted) {
            console.log("went in if")
            post.downvotes.delete(userId);
        } else if (isUpVoted) {
            console.log("went in else if");
            post.upvotes.delete(userId);
            post.downvotes.set(userId, true);
        } else {
            console.log("went in else")
            post.downvotes.set(userId, true);
        }

        console.log("after ifelse; ", "upvotes: ", post.upvotes, "downvotes: ", post.downvotes);

        const updatedPost = await Post.findByIdAndUpdate (
            postId, 
            { downvotes: post.downvotes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log("error with downvotePost");
        res.status(404).json({ message: err.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log("postId get", postId);
        const post = await Post.findByIdAndDelete(postId);
        res.status(200).json({message: "post deleted!"});
    } catch (err) {
        console.log("error in deletePost");
        res.status(404).json({ message: err.message })
    }
}

