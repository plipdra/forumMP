import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import FullPostWidget from "scenes/widgets/FullPostWidget";

const PostPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);

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
                    {/* <FullPostWidget postId={"64bca2d7bb30c05682b87606"} /> */}
                    {/* <FullPostWidget userId={user._id} /> */}
                    hi
                    
                    
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

export default PostPage;