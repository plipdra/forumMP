import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    comments: [],
    fullPost: null,
    order: "New",
    filter: "posts",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            console.log(state.user);
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            console.log(state.user);
        },
        setOrder: (state) => {
            state.order = state.order === "New" ? "Trending" : "New";
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
            console.log(state.posts);
        },
        setFullPost: (state, action) => {
            state.fullPost = action.payload.fullPost;
            console.log(state.fullPost);
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    console.log("went in");
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
        setComments: (state, action) => {
            state.comments = action.payload.comments;
            console.log(state.comments);
        },
        setComment: (state, action) => {
            const updatedComments = state.posts.map((comment) => {
                if (comment._id === action.payload.comment._id) {
                    console.log("went in");
                    return action.payload.comment;
                }
                return comment;
            });
            state.comments = updatedComments;
        },
        setFilterProfile:(state) => {
            state.filter = state.filter === "posts" ? "comments":"posts";
            console.log(state.filter);
        }
    }
})

export const { setMode, setLogin, setLogout, setOrder, setPosts, setFullPost, setPost, setComments, setComment, setFilterProfile } = authSlice.actions;
export default authSlice.reducer;
