const { model, Schema } = require("mongoose");

const TodoSchema = new Schema({

    courseCode: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    details: {
        type: String,
        default: "no details",
    },

    hidden: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    endsAt: {
        type: Date,
    },

    grade: {
        type: Number,
        default: 1,
    }

});

const Todo = new model("todo", TodoSchema);

module.exports = Todo;