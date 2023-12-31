import {
    ManageAccountsOutlined,
    EditOutlined,

} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Avatar } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
        return null;
    }

    const {
        username,
        email,
    } = user;

    return (
        <WidgetWrapper>
            {/* First Row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem">
                    {/* <UserImage image={picturePath} /> */}
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => navigate(`/profile/${userId}`)}
                        >
                            {username}
                        </Typography>
                        <Typography>Description</Typography>
                    </Box>

                </FlexBetween>

                <ManageAccountsOutlined onClick={() => navigate(`/profile/${userId}`)}
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer"
                        }
                    }}
                />
            </FlexBetween>



        </WidgetWrapper>
    )
}

export default UserWidget;
