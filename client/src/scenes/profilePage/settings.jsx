import Navbar from "scenes/navbar";
import "./settings.css"
import { Box, useTheme } from "@mui/material";
import DeleteUserAlert from "components/DeleteUserAlert";
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
            <hr/>
            <li id="account-settings">Change Email and Password</li>
            <hr/>
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
              &nbsp;<input type="text" placeholder="<CURRENTUSERNAME>" name="username" id="username"/><br/>
              <label htmlFor="desc"><b>Profile Description: </b></label> <br></br>
              <textarea name="desc" id="user-desc" placeholder="curr desc"></textarea><br/>
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
