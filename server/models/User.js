import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 4,
            max: 20,
        },
        about: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        picturePath: {
            type: String,
            default: "",
        },
        pronouns: String, // lol idk what to do wid dis muna di ko pa to iniimplement
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;