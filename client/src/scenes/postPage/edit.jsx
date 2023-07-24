import Navbar from "scenes/navbar";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import CreateCommentWidget from "scenes/widgets/CreateCommentWidget";
import FullPostWidget from "scenes/widgets/FullPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import { useParams } from "react-router-dom";
import CommentsWidget from "scenes/widgets/CommentsWidget";
import EditPost from "scenes/widgets/EditPost";

const EditPostPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const comments = useSelector((state) => state.comments);
    const { postId } = useParams();

    return (
    <Box>
        <Navbar />
        {user && (
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={user._id} picturePath={user.picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <EditPost postId={postId} />
                    {/* <FullPostWidget userId={user._id} /> */}
                    {/* <h2>Post ID: {postId}</h2> */}
                    {/* <PostsWidget /> */}
                    {/* hi */}
                    
                    
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                    </Box>
                )}
            </Box>            
        )}
        {/* {!user && (
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostsWidget userId={user._id} />
                    
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                    </Box>
                )}
            </Box>         
        )} */}

    </Box>
    );
};

export default EditPostPage;