import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.order);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    let isTherePost = false;

    // const getPost = async () => {
    //     const response = await fetch(`http://localhost:3001/posts/${postId}`, {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}`},
    //     });
    //     const data = await response.json();
    //     dispatch(setPosts({ posts: data }));
    //     console.log("GetPost for full Page");
    // }

    const getPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        console.log(posts, "getPosts");
    };

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        console.log(posts, "getUserPosts");
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
        } else {
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


    if (!isTherePost){
        return (<h1>ala boii?</h1>);
    }

    // return (console.log(posts))

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
                    comments,
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
                        comments={comments}
                    />
                )
            )}
        </>
    )
}

export default PostsWidget;
