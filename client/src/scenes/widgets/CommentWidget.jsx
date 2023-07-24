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

const CommentWidget = ({
    commentId,
    commentText,
    postId,
    commentUserId,
    username,
    replies,
    userPicturePath,
}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const loggedInUserId = useSelector((state) => state.user._id);
    let isUserPoster = false;
    const [ shouldRerender, setShouldRerender ] = useState(false);

    console.log("params: ", commentText)

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const fullPage = (postId) => {
        navigate(`/posts/${postId}`);
    }

    const editComment = async () => {
        
    }

    const deleteComment = async () => {
        const response = await fetch(`http://localhost:3001/comments/${commentId}/delete`, {
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

    if (loggedInUserId === commentUserId) {
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
                            onClick={() => navigate(`/profile/${commentUserId}`)}
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
                    variant="h5"
                    sx={{
                        mt: "1rem"
                    }}
                    ml={"4.4rem"}
                    mb={"1rem"}
                >
                    {commentText}
                </Typography>              
            </Box>

            <Box
                justifySelf="center"
                alignSelf="center"
            >
            </Box>
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={fullPage}>
                            <ChatOutlined />
                        </IconButton>
                        <Typography>Reply</Typography>
                    </FlexBetween>
                    {isUserPoster && (
                        <FlexBetween>
                            <IconButton onClick={editComment}>
                                <EditOutlined />
                            </IconButton>
                            <Typography>Edit</Typography>
                        </FlexBetween>
                    )}
                    {isUserPoster && (
                        <FlexBetween>
                            <IconButton onClick={deleteComment}>
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

export default CommentWidget;
