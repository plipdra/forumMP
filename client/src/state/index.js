import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
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
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                    console.log(state.posts);
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

export const { setMode, setLogin, setLogout, setPosts, setPost, setFilterProfile } = authSlice.actions;
export default authSlice.reducer;
