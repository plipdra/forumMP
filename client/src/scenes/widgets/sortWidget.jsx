import {
    ManageAccountsOutlined,
    EditOutlined,

} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button, Avatar } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "state";

const SortWidget = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);

    return (
        <WidgetWrapper
        width={"100%"}
        ml={"Auto"}
        mr={"Auto"}
        display= "flex"
        // justifyContent= "space-around"
        alignItems= "center"
        padding = "1.5rem 0.75rem"
        >
            {/* First Row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem">
                    <Typography variant="h4">Sort Posts by: </Typography>
                    <Button
                        onClick={() => {dispatch(setOrder()); window.location.reload(false)}}
                        disabled={order === "New"}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem",
                            "&:disabled": {
                                color: palette.info.light,
                                backgroundColor: palette.primary.light,

                            },
                            "&[disabled]:hover": {
                                cursor:'not-allowed',
                            },
                            "&:hover":{
                                color:palette.info.dark,
                                backgroundColor: palette.primary.dark,
                            }
                        }}
                    >
                        NEW
                    </Button>
                    <Button
                        onClick={() => {dispatch(setOrder()); window.location.reload(false)}}
                        disabled={order === "Trending"}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem",
                            "&:disabled": {
                                color: palette.info.light,
                                backgroundColor: palette.primary.light,

                            },
                            "&[disabled]:hover": {
                                cursor:'not-allowed',
                            },
                            "&:hover":{
                                color:palette.info.dark,
                                backgroundColor: palette.primary.dark,
                            }
                        }}
                    >
                        TRENDING
                    </Button>
                </FlexBetween>

                
            </FlexBetween>



        </WidgetWrapper>
    )
}

export default SortWidget;
