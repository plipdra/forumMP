import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers } from "state";
import PostWidget from "./PostWidget";
import UserResultWidget from "./UserResultWidget";
import { Typography } from "@mui/material";

const UserResultsWidget = ({ value }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const users = useSelector((state) => state.users);
    let isThereUsers = false;

    const getUsers = async () => {
        const response = await fetch(`http://localhost:3001/search/${value}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setUsers({ users: data }));
        console.log(users, "getUsers");
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (!isThereUsers){
        return (<Typography variant={"h3"}>No Results Found.</Typography>);
    }

    // return (console.log(users))

    return (
        <>
            {users.map(
                ({
                    _id,
                    username,
                    about,
                    picturePath,
                }) => (
                    <UserResultWidget
                        key={_id}
                        userId={_id}
                        username={`${username}`}
                        about={about}
                        picturePath={picturePath}
                    />
                )
            )}
        </>
    )
}

export default UserResultsWidget;
