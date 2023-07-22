import { useState, useEffect } from "react";
import Navbar from "scenes/navbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import FilterWidget from "scenes/widgets/FilterWidget"
import { useSelector } from "react-redux";
import PostsWidget from "scenes/widgets/PostsWidget";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const [pageType, setPageType] = useState("posts");
    // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token); // current token
    // const user = useSelector((state) => state.user); // current user
    const showPosts = pageType === "posts";
    const showComms = pageType === "comments";


    //get posts and comments from the server
    const userComments = [];

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
                <PostsWidget userId={user._id} isProfile />
            </Box>
        </Box>
    </Box>
    )
};

export default ProfilePage;
