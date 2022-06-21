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
    },

    hidden: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

});

const Todo = new model("todo", TodoSchema);

async function testRun(){
    require("../config/db")(); // connnect to the mongo db
    const todo1 = new Todo({
        courseCode:"Math142",
        title: "TestTitle",
        details: "blabla"
    });
    
    await todo1.save();
    console.log("okay")
}

module.exports = Todo;