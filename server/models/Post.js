import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            max: 50,
        },
        description: {
            type: String,
            required: true,
        },
        userPicturePath: String,
        picturePath: String,
        upvotes: {
            type: Map,
            of: Boolean,
        },
        downvotes: {
            type: Map,
            of: Boolean,
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        updatedAt: { 
            type: Date, 
            default: Date.now
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;