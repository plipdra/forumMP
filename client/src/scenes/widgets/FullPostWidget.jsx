import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setFullPost } from "state";
import PostWidget from "./PostWidget";

const FullPostWidget = ({ postId }) => {
    const dispatch = useDispatch();
    const fullPost = useSelector((state) => state.fullPost);
    const token = useSelector((state) => state.token);
    var post = null;
    let isTherePost = false;

    const getPost = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const data = await response.json();
        dispatch(setFullPost({ fullPost: data }));
    };

    useEffect(() => {
        getPost();
    }, []);

    // return (console.log("here", fullPost))

    return (
        <>
            {[fullPost].map(
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
                        username={username}
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

export default FullPostWidget;
