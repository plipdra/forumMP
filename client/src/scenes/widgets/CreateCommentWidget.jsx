import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments } from "state";

const CreateCommentWidget = ({ postId, picturePath, parentCommentId = null, isReply = false }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handleComment = async () => {
        console.log("went in handleComment")
        const formData = new FormData();
        formData.append("userId", _id);
        console.log("appended userId: ", _id);
        formData.append("postId", postId);
        console.log("appended postId: ", postId);
        formData.append("commentText", text);
        console.log("appended text: ", text);

        console.log("FormData: ", formData);

        const commentData = {
            _id,
            postId,
            text
        };

        console.log(commentData)

        if (!isReply) {
            const response = await fetch(`/comments`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ postId: postId, userId: _id, commentText: text }),
            });
            const comments = await response.json();
            dispatch(setComments({ comments }));
        } else {
            const response = await fetch(`/comments/reply`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ postId: postId, parentCommentId: parentCommentId, userId: _id, commentText: text }),
            });
            const comments = await response.json();
        }
        console.log("response pending");

        setText("");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind?"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    multiline= "true"
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
                <Button
                    disabled={!text}
                    onClick={() => {handleComment(); window.location.reload(false)}}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                        "&:disabled": {
                            color: palette.info.light,
                            backgroundColor: palette.primary.light,

                        },
                        "&[disabled]:hover": {
                            cursor:'not-allowed',
                        },
                        "&:hover":{
                            color:palette.info.dark,
                            backgroundColor: palette.primary.dark,
                        }
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default CreateCommentWidget;
