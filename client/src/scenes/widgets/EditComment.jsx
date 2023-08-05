import * as React from 'react';
import { useState, useEffect } from "react";
import { Button } from "@mui/base";
import { Box, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Navbar from "scenes/navbar";
import "../profilePage/settings.css"
import { useTheme } from '@emotion/react';
import { setEditComment, setEditPost, setPost } from 'state';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditComment = ({ postId, commentId }) => {
  const { palette } = useTheme();
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.light;
  console.log(postId, "lol")

  const getComment = async () => {
    console.log(commentId, "commentId")
    const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    const data = await response.json();
    setCommentText(data.commentText);
    dispatch(setEditComment({ editComment: data }));
  };

  const editCommentContent = async () => {
    const response = await fetch(`http://localhost:3001/comments/${commentId}/edit`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ commentText: commentText }),
    });
    const updatedComment = await response.json();
    navigate(`/posts/${postId}`);
    
  }

  useEffect(() => {
    getComment();
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
          <TextField rows={4} multiline
            onChange={(e) => setCommentText(e.target.value)}
          label="Description" id="outlined-size-normal" value={commentText} fullWidth />
        </Box>
        <Stack direction="row" spacing={2}>
        <Button variant="contained" className='save' disabled={!commentText} onClick={editCommentContent} >
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

export default EditComment;
