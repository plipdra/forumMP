import Navbar from "scenes/navbar";
import "./settings.css"
import { Box, useTheme, InputBase, Divider } from "@mui/material";
import DeleteUserAlert from "components/DeleteUserAlert";
import Input from '@mui/base/Input';
//TODO add settings
const UserSettings = () => {

  const { palette } = useTheme();

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
            <li id="profile-settings">Edit profile</li>
            <Divider
              sx={{
                margin: "1.25rem 0"
              }}
            />
            <li id="account-settings">Change Email and Password</li>
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
          <Box id="profile">
            <h3>Profile Settings</h3><br/>
            <form action="">
              <label htmlFor="username"><b>Username:</b></label>&nbsp;&nbsp;
              &nbsp;<InputBase type="text" placeholder="<CURRENTUSERNAME>" name="username" id="username"
                                    sx={{
                                      width: "100%",
                                      backgroundColor: palette.neutral.light,
                                      borderRadius: "2rem",
                                      padding: "1rem 2rem",
                                  }}
              /><br/>
              <label htmlFor="desc"><b>Profile Description: </b></label> <br></br>
              <InputBase multiline={true} name="desc" id="user-desc" placeholder="curr desc"
                        sx={{
                          width: "100%",
                          backgroundColor: palette.neutral.light,
                          borderRadius: "2rem",
                          padding: "1rem 2rem",
                        }}
              ></InputBase><br/>
            </form>
          </Box>
          {/* hide when not selected ang change email and pass */}
          <Box id="account">
            <h3>Account Settings</h3>
            <form>
              <label htmlFor="email"><b>Email Address:</b></label>&nbsp;&nbsp;
            </form>
          </Box>
            {/* is inside settings form when other options are hidden */}
            <span className="save">Confirm Changes</span>
            <span className="cancel">Cancel Changes</span>
        </div>
      </Box>
    </Box>
  )
};

export default UserSettings
