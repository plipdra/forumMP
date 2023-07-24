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

        user.username = username;
        user.about = about;

        const updatedUser = User.findByIdAndUpdate(
            id,
            { username: user.username },
            { about: user.about },
            { new: true }
        );
        console.log(updatedUser);
        res.status(200).json(updatedUser);

    } catch (err) {
        console.log("error with editUser");
        res.status(404).json({ message: err.message })
    }
}