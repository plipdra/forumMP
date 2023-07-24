import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// TODO: CONVERT TO COMMENTS, ADD EDIT COMMENT

/* CREATE */
export const createComment = async (req, res) => {
    console.log("Inside createComment");
    try {
        const { postId, userId, commentText } = req.body;
        console.log(postId)
        const user = await User.findById(userId);
        const newComment = new Comment({
            postId,
            userId,
            username: user.username,
            commentText,
            userPicturePath: user.picturePath,
        })
        await newComment.save();

        const comment = await Comment.find();
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* READ */
export const getComments = async (req, res) => {
    console.log("getComments");
    try {
        const { postId } = req.params;
        console.log("PostIdasd: ", postId)
        const comment = await Comment.find({ postId });
        console.log("comments asd", comment)
        res.status(200).json(comment);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserComments = async (req, res) => {
    console.log("GetUserComments")
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

export const deleteComments = async (req, res) => {
    console.log("deleteComments");
    try {
        const { postId } = req.params;
        console.log("commentId get", postId);
        const comment = await Comment.deleteMany({postId: postId});

        console.log("commentss", comment)

        // const updatedComment = await Comment.deleteMany(comment);

        console.log("commentzz", comment)

        res.status(200).json({message: "comments deleted!"});
    } catch (err) {
        console.log("error in deleteComment");
        res.status(404).json({ message: err.message })
    }
}