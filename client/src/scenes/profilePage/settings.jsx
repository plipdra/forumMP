import Navbar from "scenes/navbar";
import "./settings.css"
import { Box, useTheme, InputBase, Divider } from "@mui/material";
import DeleteUserAlert from "components/DeleteUserAlert";
import Input from '@mui/base/Input';
import { useState } from "react";
import { useSelector } from "react-redux";
//TODO add settings
const UserSettings = () => {
  const [pageType, setPageType] = useState("editProfile");
  const user = useSelector((state) => state.user);
  const { palette } = useTheme();
  const isEditProfile = pageType === "editProfile";
  const isEditAccount = pageType === "editAccount";

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
                &nbsp;<InputBase type="text" placeholder={user.username} name="username" id="username"
                        sx={{
                          width: "100%",
                          backgroundColor: palette.neutral.light,
                          borderRadius: "2rem",
                          padding: "1rem 2rem",
                        }}
                /><br/>
                <label htmlFor="desc"><b>Profile Description: </b></label> <br></br>
                <InputBase multiline={true} name="desc" id="user-desc" placeholder={user.about}
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                  }}
                ></InputBase><br/>
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
            <span className="save">Confirm Changes</span>
            <span className="cancel">Cancel Changes</span>
        </div>
      </Box>
    </Box>
  )
};

export default UserSettings
