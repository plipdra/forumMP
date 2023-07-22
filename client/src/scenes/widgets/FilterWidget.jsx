import { Box, Typography, Divider, useTheme, Avatar } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setFilterProfile } from "state";
// import { useSelector } from "react-redux";

const FilterWidget = () => {
  const [pageType, setPageType] = useState("posts");
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const filterBG = palette.background.alt
  const showPosts = pageType === "posts";
  const showComms = pageType === "comments";
  return(
    <WidgetWrapper
      display= "flex"
      justifyContent= "space-around"
      alignItems= "center"
      padding = "1.5rem 0.75rem"
    >
      <Typography
        onClick={() => {
          dispatch(setFilterProfile());
        }}
        variant="h4"
        color={dark}
        fontWeight="500"
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
        variant="h4"
        color={dark}
        fontWeight="500"
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
  )
};

export default FilterWidget;
