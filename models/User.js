const mongoose = require("mongoose");

/** Saving a user:
const newUsr = new User({username:"test2", password:"321"});
newUsr.save();
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },

    role: {
        type: String,
        default: "user",
    }
});


const User = new mongoose.model("user", userSchema);

module.exports = User;