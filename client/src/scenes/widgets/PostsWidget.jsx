import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    let isTherePost = false;

    const getPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        console.log(posts, "here");
    };

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        console.log(posts, "there");
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

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

    if (!isTherePost){
        console.log("hey?");
        return (<h1>ala boii?</h1>);
    } else {
        console.log("helo");
    }

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
                        userId={userId}
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
