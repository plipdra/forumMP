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

export const getSearchUsers = async (req, res) => {
    console.log("Server getSearchUsers");
    try {
        const { query } = req.params;
        console.log(query, "This is the query")
       
        let regExVal = new RegExp(`\\b${query}\\b`);
        console.log(regExVal)
        let user = await User.find( { $or: [ 
            { username: { $regex: regExVal, $options: 'i' } },
            { about: { $regex: regExVal, $options: 'i' } }
        ]})

        console.log("getting the Users...")

        console.log("This is the user", user);

        if (user.length > 0) {
            console.log("went in here")
            res.status(200).json(user);
        } else {
            res.status(300).json(user);
        }
    } catch (err) {
        console.log("error in getSearchPosts")
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