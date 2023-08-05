import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFullPost } from "state";
import PostWidget from "./PostWidget";

const FullPostWidget = ({ postId }) => {
    const dispatch = useDispatch();
    const fullPost = useSelector((state) => state.fullPost);
    const token = useSelector((state) => state.token);

    const getPost = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const data = await response.json();
        dispatch(setFullPost({ fullPost: data }));
    };

    // if (isTherePost === false) {
    //     // getPost();
    //     isTherePost = true;
    //     console.log("here", fullPost);
    //     console.log(isTherePost);
    // }

    useEffect(() => {
        getPost();
        console.log("useEffect", fullPost);
    }, []);

    // return (console.log("here", fullPost))

    if (fullPost) {
        return (
        <PostWidget
        key={fullPost._id}
        postId={fullPost._id}
        postUserId={fullPost.userId}
        username={fullPost.username}
        title={fullPost.title}
        description={fullPost.description}
        picturePath={fullPost.picturePath}
        userPicturePath={fullPost.userPicturePath}
        upvotes={fullPost.upvotes}
        downvotes={fullPost.downvotes}
        votes={fullPost.votes}
        isEdited={fullPost.isEdited}
        comments={fullPost.comments}
        />
        );
    } else {
        return null;
    }


    // return (
    //     <>
    //         {[fullPost]?.map(
    //             ({
    //                 _id,
    //                 userId,
    //                 username,
    //                 title,
    //                 description,
    //                 picturePath,
    //                 userPicturePath,
    //                 upvotes,
    //                 downvotes,
    //                 comments,
    //             }) => (
    //                 <PostWidget
    //                     key={_id}
    //                     postId={_id}
    //                     postUserId={userId}
    //                     username={username}
    //                     title={title}
    //                     description={description}
    //                     picturePath={picturePath}
    //                     userPicturePath={userPicturePath}
    //                     upvotes={upvotes}
    //                     downvotes={downvotes}
    //                     comments={comments}
    //                 />
    //             )
    //         )}
    //     </>
    // )
}

export default FullPostWidget;
