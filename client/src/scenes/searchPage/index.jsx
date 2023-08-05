import Navbar from "scenes/navbar";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import SortWidget from "scenes/widgets/sortWidget";
import PostsResultsWidget from "scenes/widgets/PostsResultsWidget";
import UserResultsWidget from "scenes/widgets/UserResultsWidget";
import CommentsWidget from "scenes/widgets/CommentsWidget";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const { value } = useParams();
    console.log(value, "This is the query in index.jsx of searchPage")

    // useEffect(() => {
    //     // window.location.reload(false);
    // }, [value]);

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
                    <Box
                        m={"2rem"}
                    >
                        <Typography variant={"h1"}>Search Results For: {console.log(value)} </Typography>
                    </Box>

                    <Box
                        m={"2rem"}
                    >
                        <Typography variant={"h2"}>Users Results:</Typography>
                        <Divider />
                        <UserResultsWidget value={value} />
                    </Box>

                    <Divider />

                    <Box
                        m={"2rem"}
                    >
                        <Typography variant={"h2"}>Posts Results:</Typography>
                        <Divider />
                        <PostsResultsWidget query={value} />
                    </Box>

                    <Divider />

                    <Box
                        m={"2rem"}
                    >
                        <Typography variant={"h2"}>Comments Results:</Typography>
                        <Divider />
                        <CommentsWidget isSearch={true} query={value} />
                    </Box>

                    <Divider />

                    {/* <CreatePostWidget picturePath={user.picturePath} />
                    <Box m={"2rem"} />
                    <SortWidget userId={user._id} picturePath={user.picturePath} />
                    <Box m={"2rem"} />
                    <PostsWidget userId={user._id} /> */}
                    
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

export default SearchPage;