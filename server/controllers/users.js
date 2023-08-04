import User from "../models/User.js";

// TODO: ADD EDIT USER? LIKE YUNG USERNAME AND ABOUT PATI IMG?

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const editUser = async (req, res) => {
    console.log("editUser");
    try {
        const { id } = req.params;
        const { username, about } = req.body;
        const user = await User.findById(id);

        if (username) {
            user.username = username;
            console.log("username line 25");
        }
        if (about) {
            user.about = about;
            console.log("about line 29");
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username: user.username },
            { new: true }
        );
        console.log("updatedUser1", updatedUser);
        console.log("Updating about...");
        const updatedUser2 = await User.findByIdAndUpdate(
            id,
            { about: user.about },
            { new: true }
        );

        console.log("this is the user", updatedUser2);
        res.status(200).json(updatedUser2);

    } catch (err) {
        console.log("error with editUser");
        res.status(404).json({ message: err.message })
    }
}