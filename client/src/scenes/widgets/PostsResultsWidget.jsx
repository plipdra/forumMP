import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Typography } from "@mui/material";

const PostsResultsWidget = ({ query = null }) => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.order);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const [ isTherePost, setIsTherePost ] = useState(false);

    const getPosts = async () => {
        console.log("This is the query ", query)
        const response = await fetch(`http://localhost:3001/posts/search/${query}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        // dispatch(setPosts({ posts: [] }));
        console.log(posts, "getPosts (search)");
        console.log(response.status, "status")
        if (response.status === 200) {
            setIsTherePost(true);
        } else {
            setIsTherePost(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // if (posts) {
    //     isTherePost = true;
    // } else {
    //     isTherePost = false;
    // }

    if (!isTherePost){
        return (<Typography variant={"h3"}>No Results Found.</Typography>);
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
                    isEdited,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        username={username}
                        title={title}
                        description={description}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        upvotes={upvotes}
                        downvotes={downvotes}
                        isEdited={isEdited}
                    />
                )
            )}
        </>
    )
}

export default PostsResultsWidget;
