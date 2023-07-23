import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    fullPost: null,
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
        setFilterProfile:(state) => {
            state.filter = state.filter === "posts" ? "comments":"posts";
            console.log(state.filter);
        }
    }
})

export const { setMode, setLogin, setLogout, setPosts, setFullPost, setPost, setFilterProfile } = authSlice.actions;
export default authSlice.reducer;
