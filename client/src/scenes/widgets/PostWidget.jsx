import {
    ThumbUpOffAlt,
    ThumbUp,
    ThumbDownOffAlt,
    ThumbDown,
    ChatOutlined,
} from "@mui/icons-material";
import { Card, Divider, IconButton, Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

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
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isUpvoted = Boolean(upvotes[loggedInUserId]);
    const isDownvoted = Boolean(downvotes[loggedInUserId]);
    const votes = Object.keys(upvotes).length - Object.keys(downvotes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchUpvote = async () => {
        const response = await fetch(`http//localhost:3001/posts/${postId}/upvote`, {
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

    const patchDownvote = async () => {
        const response = await fetch(`http//localhost:3001/posts/${postId}/downvote`, {
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
                    >
                        {username}
                    </Typography>
                </Box>

            </Box>
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
                variant="h3"
                sx={{
                    mt: "1rem"
                }}
            >
                {description}
            </Typography>
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
                        <IconButton>
                            <ChatOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default PostWidget;
