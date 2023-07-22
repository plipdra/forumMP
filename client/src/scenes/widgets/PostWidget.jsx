import {
    ThumbUpOutlined,
    ThumbUpFilled,
    ThumbDownOutlined,
    ThumbDownFilled,
    ChatOutlined,
} from "@mui/icons-material";
import { Card, Divider, IconButton, Typography, useTheme } from "@mui/material";
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
    const { isComments, setIsComments } = useState(false);
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

    return (
        <WidgetWrapper m="2rem 0">
            <FlexBetween>
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
            </FlexBetween>
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
            {picturePath && (
                <img 
                    width="100%"
                    height="auto"
                    alt="picture"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
        </WidgetWrapper>
    )
}

export default PostWidget;