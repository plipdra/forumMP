import mongoose from "mongoose";

// const ReplySchema = new mongoose.Schema(
//     {
//         userId: {
//             type: String,
//             required: true,
//         },
//         postId: {
//             type: String,
//             required: true,
//         },
//         commentId: {
//             type: String,
//             required: true,
//         },
//         text: {
//             type: String,
//             required: true,
//         },
//         userPicturePath: String,
//         comments: {
//             type: [Comment],
//             default: []
//         },
//         parentCommentId: {
//             type: String,
//             required: true,
//         }
//     },
//     { timestamps: true }
// )


// const CommentSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: String,
//             required: true,
//         },
//         postId: {
//             type: String,
//             required: true,
//         },
//         commentId: {
//             type: String,
//             required: true,
//         },
//         text: {
//             type: String,
//             required: true,
//         },
//         userPicturePath: String,
//         comments: {
//             type: [ReplySchema],
//         },
//     },
//     { timestamps: true }
// );

const CommentSchema = new mongoose.Schema(
    {
        commentText: { 
            type: String, required: true 
        },
        postId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true 
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true 
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        updatedAt: { 
            type: Date, 
            default: Date.now
        },
        replies: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment' 
        }],
    });

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
