import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Typography } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false, isSearch = false, query = null }) => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.order);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    let isTherePost = false;

    const getPosts = async () => {
        // const response = await fetch(`http://localhost:3001/search/${query}`, {
        //     method: "GET",
        //     headers: { Authorization: `Bearer ${token}`},
        // });
        // const data = await response.json();
        // dispatch(setPosts({ posts: data }));
        dispatch(setPosts({ posts: [] }));
        console.log(posts, "getPosts (search)");
    };

    const getUserPosts = async () => {
        if (userId) {
            const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            });
            const data = await response.json();
            dispatch(setPosts({ posts: data }));
            console.log(posts, "getUserPosts");
        }

    };

    const getFilteredPosts = async () => {
        console.log("getFilteredPosts")
        const response = await fetch(`http://localhost:3001/posts/order/${filter}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        // getPosts();
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        console.log(posts, "getFilteredPosts");
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else if (isSearch) {
            console.log("her", isTherePost)
            getPosts();
        } else {
            console.log("adsf")
            if (filter) {
                getFilteredPosts();
            } else {
                getPosts();
            }
            // getPosts();
        }
    }, []);

    if (isProfile) {
        for (let post of posts) {
            if (post.userId === userId) {
                // then may post
                isTherePost = true;
                break;
                
            } else {
                // then wala
                isTherePost = false;
            }        
        }
    } else {
        if (posts) {
            isTherePost = true;
        } else {
            isTherePost = false;
        }
    }

    if (isSearch) {
        isTherePost = false;
    }


    if (!isTherePost){
        return (<Typography variant={"h3"}>No Results Found.</Typography>);
    }

    return (console.log(posts))

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    username,
                    title,
                    description,
                    picturePath,
                    userPicturePath,
                    upvotes,
                    downvotes,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        username={`${username}`}
                        title={title}
                        description={description}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        upvotes={upvotes}
                        downvotes={downvotes}
                    />
                )
            )}
        </>
    )
}

export default PostsWidget;
