import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form.jsx";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return <Box>
        <Box
            width="100%"
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
            >
            <Typography
                    width="10%"
                    margin="0px auto"
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.primary.light,
                        },
                    }}
            >
                    Sphere
            </Typography>

        </Box>
        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem"}}>
                Connect to users all around the Sphere!
            </Typography>
            <Form />
        </Box>
    </Box>
};

export default LoginPage;
