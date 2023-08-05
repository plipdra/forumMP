import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments } from "state";
import PostWidget from "./PostWidget";
import CommentWidget from "./CommentWidget";
import { Typography } from "@mui/material";

const CommentsResultsWidget = ({ query = null }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const token = useSelector((state) => state.token);
    const [ isThereComment, setIsThereComments ] = useState(false);

    const searchComments = async () => {
        const response = await fetch(`http://localhost:3001/comments/search/${query}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setComments({ comments: data }));
        console.log(comments, "getComments");

        if (response.status === 200) {
            setIsThereComments(true);
        } else {
            setIsThereComments(false);
        }
    }

    useEffect(() => {
        searchComments();
    }, []);

    if (!isThereComment){
        return (<Typography variant={"h3"}>No Results Found.</Typography>);
    }

    // return (console.log("return: ", comments))
    console.log("commesnts", comments)

    return (
        <>
            {comments.map(
                ({
                    _id,
                    commentText,
                    postId,
                    userId,
                    username,
                    replies,
                    userPicturePath,
                }, index) => (
                    <CommentWidget
                        key={index}
                        commentId={_id}
                        commentText={commentText}
                        postId={postId}
                        commentUserId={userId}
                        username={username}
                        replies={replies}
                        userPicturePath={userPicturePath}
                    />
                )
            )}
        </>
    )
}

export default CommentsResultsWidget;
