import * as React from 'react';
import { Button } from "@mui/base";
import { Box, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Navbar from "scenes/navbar";
import "../profilePage/settings.css"
import { useTheme } from '@emotion/react';

const EditPost = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.light;

  return(
    <Box>
      <Navbar></Navbar>
      <Box
      width={"80%"}
      height={"fit-content"}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        margin: "30px auto",
        backgroundColor: dark,
        padding: "10px 80px 20px",
        borderRadius: "8px",
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Edit Post</h1>
        <Box
        id="edit-form"
        sx={{maxWidth:"100%",}}
        >
          <TextField
            label="New Title"
            id="outlined-size-small"
            defaultValue="<old title>"
            size="small"
            sx={{margin: "auto"}}
          /><br/>
          <TextField rows={4} multiline
          label="Description" id="outlined-size-normal" defaultValue="<old description>" fullWidth />
        </Box>
        <Stack direction="row" spacing={2}>
        <Button variant="contained" className='save'>
          Confirm Edit
        </Button>
        <Button variant="outlined" className='cancel'>
          Discard Changes
        </Button>
      </Stack>
      </Box>
    </Box>
  );
}

export default EditPost;
