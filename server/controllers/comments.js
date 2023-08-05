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
            parentCommentId: null,
            userId,
            username: user.username,
            commentText,
            isEdited: false,
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

export const createReply = async (req, res) => {
    console.log("Inside createReply");
    try {
        const { postId, parentCommentId, userId, commentText } = req.body;
        console.log(postId)
        const user = await User.findById(userId);
        const newComment = new Comment({
            postId,
            parentCommentId,
            userId,
            username: user.username,
            commentText,
            isEdited: false,
            userPicturePath: user.picturePath,
        })
        await newComment.save();

        const comment = await Comment.find({parentCommentId});
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
        const comment = await Comment.find({ postId: postId, parentCommentId: null });

        if (!comment.parentCommentId) {
            console.log("normal comment", comment)
            res.status(200).json(comment);
        } else {
            console.log("comment has parent id (is a reply)", comment)
            res.status(300).json(comment);
        }
        
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getComment = async (req, res) => {
    console.log("getComment", req.params);
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById({_id: commentId});
        res.status(200).json(comment);
    } catch (err) {
        console.log("error in getComment");
        res.status(404).json({ message: err.message })
    }
}

export const getReplies = async (req, res) => {
    console.log("getReplies", req.params);
    try {
        const { commentId } = req.params;
        console.log("parentId: ", commentId);
        const comment = await Comment.find({ parentCommentId: commentId });

        if (!comment.parentCommentId) {
            console.log("normal reply", comment)
            res.status(200).json(comment);
        } else {
            console.log("went in else")
            res.status(300).json(null);
        }
        
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

export const getSearchComments = async (req, res) => {
    console.log("Server getSearchComments");
    try {
        const { query } = req.params;
        console.log(query, "This is the query")

        let regExVal = new RegExp(`\\b${query}\\b`);
        console.log(regExVal)
        let comment = await Comment.find( { $or: [ 
            { username: { $regex: regExVal, $options: 'i' } },
            { commentText: { $regex: regExVal, $options: 'i' } }
        ]})

        console.log("getting the comments...")

        console.log("This is the comment", comment);
        console.log("comment array length", comment.length)

        if (comment.length > 0) {
            console.log("went in here")
            res.status(200).json(comment);
        } else {
            res.status(300).json(comment);
        }
    } catch (err) {
        console.log("error in getSearchComments")
        res.status(404).json({ message: err.message });
    }
}

export const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;
        const comment = await Comment.findById({_id: commentId});

        comment.commentText = commentText;

        console.log("the text", comment.commentText);

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { commentText: comment.commentText },
            { new: true }
        );
        const updatedComment2 = await Comment.findByIdAndUpdate(
            commentId,
            { isEdited: true },
            { new: true }
        );
        console.log(updatedComment2, "comment");
        res.status(200).json(updatedComment2);
    } catch (err) {
        console.log("error in editComment");
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