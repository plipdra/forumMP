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
import { setPosts } from "state";

const CreatePostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("title", title);
        formData.append("description", desc);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        console.log("FormData: ", formData);

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setTitle("");
        setDesc("");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Title..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            <FlexBetween gap="1.5rem" mt="1.5rem">
                <InputBase
                    placeholder="Description..."
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    multiline= "true"
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": { cursor: "pointer" }
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Attach an Image... (Only 1 is accepted as of now sad)</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{
                                            width: "15%"
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}

                    </Dropzone>
                </Box>
            )}

            <Divider
                sx={{
                    margin: "1.25rem 0"
                }}
            />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": { cursor: "pointer", color: medium }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>


                <Button
                    disabled={!title || !desc}
                    onClick={handlePost}
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

export default CreatePostWidget;
