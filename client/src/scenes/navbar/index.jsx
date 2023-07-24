import { useState } from "react";
import { 
    Box,
    Button,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { SearchBar } from "components/SearchBar";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    var username = null;

    if (user) {
        var username = `${user.username}`;
    }
    // const username = "fake";

    if (username) {
        return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Sphere
                </Typography>
                {isNonMobileScreens ? (
                    <SearchBar />
                ) : (
                    <SearchBar />
                )}
            </FlexBetween>

            {/* Desktop Nav */}
            {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>

                <FormControl variant="standard" value={username}>
                    <Select
                        value={username}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root:": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}    
                        input={<InputBase />}
                    >
                        <MenuItem value={username}>
                            <Typography>{username}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {dispatch(setLogout()); navigate("/")}}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
            ) : (
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>
            )}

            {/* Mobile Nav */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed"
                top="5.9%"
                right="4.2%"
                bottom="0"
                height="25%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={palette.neutral.light}
                >
                {/* Close Icon */}   
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton 
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    <FlexBetween 
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center" 
                        alignItems="center" 
                        gap="3rem"
                    >
                        <IconButton 
                            onClick={() => dispatch(setMode())} 
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <FormControl variant="standard" value={username}>
                            <Select
                                value={username}
                                sx={{
                                    backgroundColor: palette.background.alt,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root:": {
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: palette.background.alt
                                    }
                                }}    
                                input={<InputBase />}
                            >
                                <MenuItem value={username}>
                                    <Typography>{username}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>      
    } else {
        return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Sphere
                </Typography>
                {isNonMobileScreens ? (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                ) : (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* Desktop Nav */}
            {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>

                <Button
                    sx={{
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                    }}
                    onClick={() => navigate("/")}
                >
                    Log In
                </Button>

                
            </FlexBetween>
            ) : (
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>
            )}

            {/* Mobile Nav */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed"
                top="5.9%"
                right="0"
                bottom="0"
                height="25%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={palette.neutral.light}
                >
                {/* Close Icon */}   
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton 
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    <FlexBetween 
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center" 
                        alignItems="center" 
                        gap="3rem"
                    >
                        <IconButton 
                            onClick={() => dispatch(setMode())} 
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Button
                            sx={{
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                            onClick={() => navigate("/")}
                        >
                            Log In
                        </Button>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>      
    }

};

export default Navbar;