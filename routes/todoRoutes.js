const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");


// PUBLIC GET /todo  :::  lists all todo items
router.get('/', function(req,res){
    Todo.find({}, function (err, users) {
        if (err) return res.send(err.message)
        res.send(users);
    })
})


// PRIVATE POST /todo  :::  for adding new todo item
router.post('/', function(req,res){
    // 1: check if post body is empty
    if (!req.body.courseCode || !req.body.type) return res.send("ERROR: post body is missing");

    try {
        const newTodo = new Todo(req.body)
        newTodo.save().then(doc => {
            res.status(201).send(doc);
        })
    } catch (error) {
        res.send(error.message);
    }
})


// GET /todo/:id
router.get('/:id', function(req,res){
    if (!req.params.id) return res.send("invalid id");

    Todo.findById(req.params.id, function(err, doc){
        if (err || !doc) return res.status(400).send("Error, invalid ID")
        res.send(doc)
    })
})


// PUT /todo/:id
router.put('/:id', function(req,res){
    if (!req.params.id) return res.send("invalid id");

    Todo.findOneAndUpdate(
        {_id: req.params.id}, 
        {details: "UPDATED"}, 
        {new: true},
        function(err, doc){
        if (err || !doc) return res.status(400).send("Error, invalid ID")
        res.send(doc)
    })
})


// DELETE /todo/:id
router.delete('/:id', function(req,res){
    if (!req.params.id) return res.send("invalid id");

    Todo.findByIdAndDelete(req.params.id, function(err,doc){
        if (err || !doc) return res.status(400).send("Error, invalid ID")
        return res.send("deleted")
    })
})


module.exports = router;