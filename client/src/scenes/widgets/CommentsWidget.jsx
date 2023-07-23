import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments } from "state";
import PostWidget from "./PostWidget";
import CommentWidget from "./CommentWidget";

const CommentsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const token = useSelector((state) => state.token);
    let isThereComment = false;

    // const getPost = async () => {
    //     const response = await fetch(`http://localhost:3001/posts/${postId}`, {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}`},
    //     });
    //     const data = await response.json();
    //     dispatch(setPosts({ posts: data }));
    //     console.log("GetPost for full Page");
    // }

    const getComments = async () => {
        const response = await fetch(`http://localhost:3001/comments/${postId}/comments`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setComments({ comments: data }));
        console.log(comments, "getComments");
    };

    const getUserComments = async () => {
        const response = await fetch(`http://localhost:3001/comments/${userId}/comments`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setComments({ comments: data }));
        console.log(comments, "getUserComments");
    };

    useEffect(() => {
        if (isProfile) {
            getUserComments();
        } else {
            getComments();
        }
    }, []);

    if (isProfile) {
        for (let comment of comments) {
            if (comment.userId === userId) {
                // then may post
                isThereComment = true;
                break;
                
            } else {
                // then wala
                isThereComment = false;
            }        
        }
    } else {
        if (posts) {
            isThereComment = true;
        } else {
            isThereComment = false;
        }
    }


    if (!isThereComment){
        console.log("hey?");
        return (<h1>ala boii?</h1>);
    } else {
        console.log("helo");
    }

    // return (console.log(posts))

    return (
        <>
            {[comments].map(
                ({
                    _id,
                    postId,
                    userId,
                    username,
                    text,
                    userPicturePath,
                }) => (
                    <CommentWidget
                        key={_id}
                        postId={postId}
                        commentId={_id}
                        commentUserId={userId}
                        username={username}
                        text={text}
                        userPicturePath={userPicturePath}
                    />
                )
            )}
        </>
    )
}

export default CommentsWidget;