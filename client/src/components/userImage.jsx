import { Avatar, Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    // return (
    //     <Box width={size} height={size}>
    //         <img 
    //             style={{ objectFit: "cover", borderRadius: "50%"}}
    //             width={size}
    //             height={size}
    //             alt="user"
    //             src={`http//localhost:3001/assets/${image}`}
    //         />
    //     </Box>
    // )
    return (
        <Avatar src={`http//localhost:3001/public/assets/${image}`} />
    )
}

export default UserImage;