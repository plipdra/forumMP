import { Box, Typography, Divider, useTheme, Avatar } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch } from "react-redux";
import { useState } from "react";
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
  console.log(pageType);

  return(
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
  )
};

export default FilterWidget;
