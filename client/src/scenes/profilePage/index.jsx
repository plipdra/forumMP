import { useState, useEffect } from "react";
import Navbar from "scenes/navbar";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import FilterWidget from "scenes/widgets/FilterWidget"
import { useSelector } from "react-redux";
import PostsWidget from "scenes/widgets/PostsWidget";
import { useParams } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import CommentsWidget from "scenes/widgets/CommentsWidget";

const ProfilePage = () => {
    const [pageType, setPageType] = useState("posts");
    // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token); // current token
    // const user = useSelector((state) => state.user); // current user
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const filterBG = palette.background.alt
    const showPosts = pageType === "posts";
    const showComms = pageType === "comments";
    console.log(pageType);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return (<h1>ala boi</h1>); // if no result, no page
    }

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
                <WidgetWrapper
                    display= "flex"
                    justifyContent= "space-around"
                    alignItems= "center"
                    padding = "1.5rem 0.75rem"
                >
                    <Typography
                    onClick={() => {
                        setPageType("posts")
                    }}
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                    mb="1rem"
                    sx={{
                        "&:hover": {
                            color: medium,
                            cursor: "pointer"
                        }
                    }}
                    >
                    Posts
                    </Typography>
                    <Typography
                    onClick={() => {
                        setPageType("comments")
                    }}
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                    mb="1rem"
                    sx={{
                        "&:hover": {
                            color: medium,
                            cursor: "pointer"
                        }
                    }}
                    >
                    Comments
                    </Typography>
                </WidgetWrapper>
            </Box>
            {/* contains the posts/comments */}
            {showPosts && (
                <Box
                    width="70%"
                    margin="30px auto"
                >
                    <PostsWidget userId={user._id} isProfile />
                </Box>
            )}

            {showComms && (
                <Box
                    width="70%"
                    margin="30px auto"
                >
                    <CommentsWidget userId={user._id} isProfile />
                </Box>
            )}

        </Box>
    </Box>
    )
};

export default ProfilePage;
