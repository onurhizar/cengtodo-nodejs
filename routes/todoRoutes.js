const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");


/* Error Codes

mongoose        : general code for mongoose problems
ef-coursecode   : Course code field is empty
ef-type         : Type field is empty
ef-id           : Id field is empty
invalid-id      : Given id is invalid
 */


// PUBLIC GET /todo  :::  lists all todo items
router.get('/', function(req,res){
    Todo.find({}, function (err, users) {
        if (err) {
            const errorBody = {error: {code:"mongoose", message: err.message}}
            return res.status(400).json(errorBody)
        }
        res.json(users);
    })
})


// PRIVATE POST /todo  :::  for adding new todo item
router.post('/', function(req,res){
    // 1: check if post body is empty
    if (!req.body.courseCode) {
        const errorBody = {error: {code:"ef-coursecode", message: "Course code field is empty"}}
        return res.status(400).json(errorBody)
    }
    if (!req.body.type) {
        const errorBody = {error: {code:"ef-type", message: "Type field is empty"}}
        return res.status(400).json(errorBody)
    }

    // 2: if body is valid, try to save to the db
    try {
        const newTodo = new Todo(req.body)
        newTodo.save().then(doc => {
            res.status(200).json(doc);
        })
    } catch (err) {
        const errorBody = {error: {code:"mongoose", message: err.message}}
        res.status(500).json(errorBody);
    }
})


// GET /todo/:id
router.get('/:id', function(req,res){
    if (!req.params.id) {
        const errorBody = {error: {code:"ef-id", message:"id field is empty"}}
        return res.status(400).json(errorBody);
    }

    Todo.findById(req.params.id, function(err, doc){
        const errorBody = {error: {code:"invalid-id", message:"Given ID is invalid"}}
        if (err || !doc) return res.status(400).json(errorBody)
        res.status(200).json(doc)
    })
})


// PATCH /todo/:id
router.patch('/:id', function(req,res){
    if (!req.params.id) {
        const errorBody = {error: {code:"ef-id", message:"id field is empty"}}
        return res.status(400).json(errorBody);
    }

    Todo.findOneAndUpdate(
        {_id: req.params.id}, 
        {details: "UPDATED"}, 
        {new: true},
        function(err, doc){
        if (err || !doc) {
            const errorBody = {error: {code:"invalid-id", message:"Given ID is invalid"}}
            return res.status(400).json(errorBody)
        }
        res.status(200).json(doc)
    })
})


// DELETE /todo/:id
router.delete('/:id', function(req,res){
    if (!req.params.id) return res.send("invalid id");

    Todo.findByIdAndDelete(req.params.id, function(err,doc){
        if (err || !doc) {
            const errorBody = {error: {code:"invalid-id", message:"Given ID is invalid"}}
            return res.status(400).json(errorBody)
        }
        return res.status(200).send("deleted")
    })
})


module.exports = router;