import mongoose from "mongoose";

// TODO?: EDIT PA?

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        commentId: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        userPicturePath: String,
        comments: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;