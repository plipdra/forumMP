import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
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
            type: [Comment],
            default: []
        },
        parentCommentId: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)


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
            type: [ReplySchema],
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
