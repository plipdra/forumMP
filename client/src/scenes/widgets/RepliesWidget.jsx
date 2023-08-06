import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments, setReplies } from "state";
import PostWidget from "./PostWidget";
import CommentWidget from "./CommentWidget";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const RepliesWidget = ({parentCommentId}) => {
    const dispatch = useDispatch();
    // const replies = useSelector((state) => state.replies);
    const [replies, setReplies] = useState([]);
    const token = useSelector((state) => state.token);
    let isThereComment = false;

    const getReplies = async () => {
        console.log(parentCommentId, "parentCommentId")
        const response = await fetch(`/replies/${parentCommentId}`, {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"  
            },
        });
        const data = await response.json();
        console.log("response data: ", data)
        setReplies(data);
        console.log(replies, "getReplies", parentCommentId, "Parent");
        // window.location.reload(false);
    };

    useEffect(() => {
        getReplies();
    }, []);

    if (replies) {
        isThereComment = true;
    } else {
        isThereComment = false;
    }

    if (!isThereComment){
        return null;
    }

    // return (console.log("return: ", replies))
    console.log("replai", replies)

    return (
        <>
            {replies.map(
                ({
                    _id,
                    commentText,
                    postId,
                    parentCommentId,
                    userId,
                    username,
                    replies,
                    isEdited,
                    userPicturePath,
                }, index) => (
                    <CommentWidget
                        key={index}
                        commentId={_id}
                        commentText={commentText}
                        postId={postId}
                        parentCommentId={parentCommentId}
                        commentUserId={userId}
                        username={username}
                        replies={replies}
                        isEdited={isEdited}
                        userPicturePath={userPicturePath}
                    />
                )
            )}
        </>
    )
}

export default RepliesWidget;
