import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import PostPage from "scenes/postPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import UserSettings from "scenes/profilePage/settings"
import SearchPage from "scenes/searchPage";
import EditPost from "scenes/widgets/EditPost";
import EditPostPage from "scenes/postPage/edit";
import EditCommentPage from "scenes/postPage/editComment";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/posts/:postId" element={isAuth ? <PostPage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId/settings" element={isAuth ? <UserSettings /> : <Navigate to="/" />} />
            <Route path="/search/:value" element={isAuth ? <SearchPage /> : <Navigate to="/" />} />
            <Route path="/posts/:postId/edit" element={isAuth ? <EditPostPage /> : <Navigate to="/" />} />
            <Route path="/posts/:postId/comments/:commentId/edit" element={isAuth ? <EditCommentPage /> : <Navigate to="/" />} />
            {/* <Route path="/posts/:id" render={(props) => (<PostPage id={props.match.params.id}/>)} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
