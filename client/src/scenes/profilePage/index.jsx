import { useState } from "react";
import Navbar from "scenes/navbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import FilterWidget from "scenes/widgets/FilterWidget"
import { useSelector } from "react-redux";
import PostsWidget from "scenes/widgets/PostsWidget";

const ProfilePage = () => {
    const [pageType, setPageType] = useState("posts");
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const showPosts = pageType === "posts";
    const showComms = pageType === "comments";

    //get posts and comments from the server
    const userComments = [];

    return (
    <Box>
        <Navbar />
        <Box
        >
            <Box
                width="70%"
                margin="30px auto"
            >
                <UserWidget userId={user._id} picturePath={user.picturePath} />
            </Box>
            <Box
                width="70%"
                margin="30px auto"
            >
                <FilterWidget
                    display="flex"
                    justifyContent="center"
                />
            </Box>
            {/* contains the posts/comments */}
            <Box
                width="70%"
                margin="30px auto"
            >
                <PostsWidget></PostsWidget>
            </Box>
        </Box>
    </Box>
    )
};

export default ProfilePage;
