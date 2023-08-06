import * as React from 'react';
import { useState, useEffect } from "react";
import { Button } from "@mui/base";
import { Box, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Navbar from "scenes/navbar";
import "../profilePage/settings.css"
import { useTheme } from '@emotion/react';
import { setEditPost, setPost } from 'state';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditPost = ({ postId }) => {
  const { palette } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.light;
  console.log(postId, "lol")

  const getPost = async () => {
    const response = await fetch(`/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    const data = await response.json();
    setTitle(data.title);
    setDesc(data.description);
    dispatch(setEditPost({ EditPost: data }));
  };

  const editPostContent = async () => {
    const response = await fetch(`/posts/${postId}/edit`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    navigate(`/posts/${postId}`);
    
  }

  useEffect(() => {
    getPost();
  }, []);

  return(
    <Box>
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
            size="small"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            sx={{margin: "auto"}}
          /><br/>
          <TextField rows={4} multiline
            onChange={(e) => setDesc(e.target.value)}
          label="Description" id="outlined-size-normal" value={description} fullWidth />
        </Box>
        <Stack direction="row" spacing={2}>
        <Button variant="contained" className='save' disabled={!title || !description} onClick={editPostContent} >
          Confirm Edit
        </Button>
        <Button variant="outlined" className='cancel' onClick={() => navigate(`/posts/${postId}`)}>
          Discard Changes
        </Button>
      </Stack>
      </Box>
    </Box>
  );
}

export default EditPost;
