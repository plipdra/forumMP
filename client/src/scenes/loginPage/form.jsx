import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Snackbar,
    Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    username: yup.string().required("required").min(4, 'Minimum of 4 characters').max(20, 'Maximum of 20 characters'),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    picture: yup.string(),
});

const loginSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
    picture: "",
}

const initialValuesLogin = {
    username: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const [open, setOpen] = useState(false);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    console.log(isLogin, "isLogin");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const register = async (values, onSubmitProps) => {
        console.log("registering...");
        const formData = new FormData(); // allows to send form info w img
        for (let value in values) {
            formData.append(value, values[value])
        }

        //when a pic is not uploaded, structure does not have picture variable

        if (values.picture) {
            formData.append('picturePath', values.picture.name);
        } else {
            formData.append('picturePath', 'defaultUser.png');
        }
        console.log(values)

        const savedUserResponse = await fetch(
            "/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        console.log("logging in...");
        const loggedInResponse = await fetch(
            "/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (loggedInResponse.status === 200) {
            
            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home"); 
            }
        } else {
            console.log("went here in else")
            setOpen(true);
        }
    }

    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                    >
                        { isRegister && (
                            <>
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg .jpeg .png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" }}}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here! (If no Picture is uploaded, default picture will be applied.)</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}

                                            </Box>
                                        )}

                                    </Dropzone>

                                </Box>
                                <TextField
                                    label="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />

                            </>
                        )}
                        <TextField
                            label="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={Boolean(touched.username) && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />

                    </Box>

                    {/* Buttons */}
                    <Box>
                        <Button
                            fullWidth
                            type="Submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN": "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                            ? "Don't have an Account? Register here!"
                            : "Already have an Account? Log in here!"}
                        </Typography>

                        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={6000} onClose={handleClose}
                            sx={{ 
                                width: 300
                            }}
                        >
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                Invalid Credentials!
                            </Alert>
                        </Snackbar>
                    </Box>
                </form>
            )}

        </Formik>
    )
}

export default Form;
