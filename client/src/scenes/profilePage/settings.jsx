import Navbar from "scenes/navbar";
import "./settings.css"
import { Box, useTheme, InputBase, Divider, Button } from "@mui/material";
import DeleteUserAlert from "components/DeleteUserAlert";
import Input from '@mui/base/Input';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInUser, setUser } from "state";
//TODO add settings
const UserSettings = () => {
  const [pageType, setPageType] = useState("editProfile");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isEditProfile = pageType === "editProfile";
  const isEditAccount = pageType === "editAccount";

  const editUser = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("about", about);

    console.log(formData);

    const response = await fetch(`/users/${user._id}/edit`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, about: about }),
    });
    const updatedUser = await response.json();
    dispatch(setLoggedInUser({ user: updatedUser }));
    console.log(user, "user", updatedUser, "newUser");
    window.location.reload(false);
};

  const changeState = () => {
    if (isEditProfile) {
      setPageType("editAccount");
    } else {
      setPageType("editProfile");
    }
  }

  const cleanForm = () => {

  }

  return(
    <Box>
      {/* <link rel="stylesheet" src="settings.css"></link> */}
      <Navbar/>
      <Box
        backgroundColor={palette.background.alt}
        id="user-settings"
      >
        <div id="setting-nav">
          <h3>Settings Navigation</h3>
          <ul>
            <li id="profile-settings" onClick={changeState}>Edit profile</li>
            <Divider
              sx={{
                margin: "1.25rem 0"
              }}
            />
            <li id="account-settings" onClick={changeState}>Change Email and Password</li>
            <Divider
              sx={{
                margin: "1.25rem 0"
              }}
            />
            <br/>
          </ul>
          {/* <span id="delete-account">Delete Account</span> */}
          <DeleteUserAlert></DeleteUserAlert>
        </div>
        <div id="setting">
          {/* hide when di selected ang profile settings */}
          {isEditProfile ? (
            <Box id="profile">
              <h3>Profile Settings</h3><br/>
              <form action="">
                <label htmlFor="username"><b>Username:</b></label>&nbsp;&nbsp;
                &nbsp;<InputBase type="text" placeholder={user.username} value={username} name="username" id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                          width: "100%",
                          backgroundColor: palette.neutral.light,
                          borderRadius: "2rem",
                          padding: "1rem 2rem",
                        }}
                /><br/>
                <label htmlFor="desc"><b>Profile Description: </b></label> <br></br>
                <InputBase multiline={true} name="desc" id="user-desc" value={about} placeholder={user.about}
                  onChange={(e) => setAbout(e.target.value)}
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                  }}
                ></InputBase><br/>
                <Button
                onClick={editUser}
                disabled={!username && !about} >Confirm Changes</Button>
              </form>
            </Box>
          ) : (
            <Box id="account">
              <h3>Account Settings</h3>
              <form>
                <label htmlFor="email"><b>Email Address:</b></label>&nbsp;&nbsp;

              </form>
            </Box>
          )}

          {/* hide when not selected ang change email and pass */}

            {/* is inside settings form when other options are hidden */}
            {/* <span className="save">Confirm Changes</span>
            <span className="cancel">Cancel Changes</span> */}
        </div>
      </Box>
    </Box>
  )
};

export default UserSettings
