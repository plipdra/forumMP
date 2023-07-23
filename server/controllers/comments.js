import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// TODO: CONVERT TO COMMENTS, ADD EDIT COMMENT

/* CREATE */
export const createComment = async (req, res) => {
    console.log("Inside createComment");
    try {
        const { postId, userId, commentText } = req.body;
        // const postId = "64bdaa0cd20042f3ecb91cd5";
        // const userId = "64bb49f55f83c34f73d4eb40";
        // const commentText = "asd";
        console.log("got req.body", postId, userId, commentText);
        const user = await User.findById(userId);
        console.log("got user ", user);
        const newComment = new Comment({
            postId,
            userId,
            username: user.username,
            commentText,
            userPicturePath: user.picturePath,
        })
        console.log("got Comment: ", newComment);
        await newComment.save();
        console.log("adsf")
        Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id }},
            { new: true },
        )
        console.log(Post.findById(postId))

        const comment = await Comment.find();
        console.log(comment)
        res.status(201).json(comment);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comment = await Comment.findById({ postId });
        res.status(200).json(comment);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserComments = async (req, res) => {
    try {
        const { userId } = req.params;
        const comment = await Comment.find({ userId });
        res.status(200).json(comment);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        console.log("commentId get", commentId);
        const comment = await Comment.findByIdAndDelete(commentId);
        res.status(200).json({message: "comment deleted!"});
    } catch (err) {
        console.log("error in deleteComment");
        res.status(404).json({ message: err.message })
    }
}