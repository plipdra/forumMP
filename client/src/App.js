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

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/profile/:userId/settings" element={<UserSettings />} />
            <Route path="/search/:value" element={<SearchPage />} />
            <Route path="/edit/:postId" element={<EditPost />} />
            {/* <Route path="/posts/:id" render={(props) => (<PostPage id={props.match.params.id}/>)} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
