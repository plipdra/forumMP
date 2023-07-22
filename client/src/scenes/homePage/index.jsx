import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
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
                    <CreatePostWidget picturePath={user.picturePath} />
                    <PostsWidget userId={user._id} />
                    
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                    </Box>
                )}
            </Box>            
        )}

    </Box>
    );
};

export default HomePage;