import {
    ThumbUpOffAlt,
    ThumbUp,
    ThumbDownOffAlt,
    ThumbDown,
    ChatOutlined,
    DeleteOutline,
    EditOutlined,
} from "@mui/icons-material";
import { Card, Divider, IconButton, Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
    postId,
    postUserId,
    username,
    title,
    description,
    picturePath,
    userPicturePath,
    upvotes,
    downvotes,
    comments,
}) => {
    console.log("post param: ", postId)
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const loggedInUserId = useSelector((state) => state.user._id);
    let isUserPoster = false;
    const [ shouldRerender, setShouldRerender ] = useState(false);

    const isUpvoted = Boolean(upvotes[loggedInUserId]);
    const isDownvoted = Boolean(downvotes[loggedInUserId]);
    const votes = Object.keys(upvotes).length - Object.keys(downvotes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchUpvote = async () => {
        console.log("went in here");
        const response = await fetch(`http://localhost:3001/posts/${postId}/upvote`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        console.log("passed through")
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const patchDownvote = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/downvote`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const fullPage = (postId) => {
        navigate(`/posts/${postId}`);
    }

    const editPost = async () => {
        
    }

    const deletePost = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const message = await response.json();
        setShouldRerender(true);
    };

    if (shouldRerender) {
        console.log("rerender")
        return null;
    }

    if (loggedInUserId === postUserId) {
        isUserPoster = true;
    }

    return (
        <WidgetWrapper
        m="2rem 0"
        display='flex'
        flexDirection='column'
        width="100%"
        >
            
                <Box>
                    <Box
                        display = "flex"
                        justifyContent = "flex-start"
                        alignItems = "center"
                        gap="30px"
                    >
                        <UserImage image={userPicturePath} />
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => navigate(`/profile/${postUserId}`)}
                        >
                            {username}
                        </Typography>
                    </Box>
            
                </Box>
            <Box
                key={postId} onClick={() => fullPage(postId)}
            >    
                <Typography
                    color={main}
                    variant="h2"
                    sx={{
                        mt: "1rem"
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    color={main}
                    variant="h4"
                    sx={{
                        mt: "1rem"
                    }}
                >
                    {description}
                </Typography>                
            </Box>

            <Box
                            justifySelf="center"
                            alignSelf="center"
            >

            {picturePath && (
                <img
                width="500vh"
                height="auto"
                alt="picture"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`http://localhost:3001/assets/${picturePath}`}
                />
                )}
            </Box>
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem"> {/* upvote */}
                        <IconButton onClick={patchUpvote}>
                            { isUpvoted ? (
                                <ThumbUp />
                            ) : (
                                <ThumbUpOffAlt />
                            )}
                        </IconButton>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <Typography>{votes}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem"> {/* downvote */}
                        <IconButton onClick={patchDownvote}>
                            { isDownvoted ? (
                                <ThumbDown />
                            ) : (
                                <ThumbDownOffAlt />
                            )}
                        </IconButton>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={fullPage}>
                            <ChatOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                    {isUserPoster && (
                        <FlexBetween>
                            <IconButton onClick={editPost}>
                                <EditOutlined />
                            </IconButton>
                            <Typography>Edit</Typography>
                        </FlexBetween>
                    )}
                    {isUserPoster && (
                        <FlexBetween>
                            <IconButton onClick={deletePost}>
                                <DeleteOutline />
                            </IconButton>
                            <Typography>Delete</Typography>
                        </FlexBetween>
                    )}
                </FlexBetween>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default PostWidget;
