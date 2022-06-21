const express = require("express");
const router = express.Router();

const User = require("../models/User");

// GET /user/
router.get('/', function(req,res){
    User.find({}, function(err,users){
        if (err) return res.send(err.message)
        return res.send(users)
    })
    }
)

// POST /user/ with json body , REGISTER PAGE
router.post('/', async function(req,res){
    // 1: check if given post body is empty
    if (!req.body.username) return res.status(400).send("ERROR: username cannot be empty");
    if (!req.body.password) return res.status(400).send("ERROR: password cannot be empty");

    // 2: if not empty, check if username exists..
    const result = await User.findOne({username: req.body.username})
    if (result) return res.status(400).send("ERROR: user exists.");
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
})


// GET /user/id/:userId, URL params
router.get('/id/:userId', function(req,res){
    if (!req.params.userId) return res.status(404).send("invalid username");
    User.findById(req.params.userId, function(err, user){
        if (err) return res.status(404).send("Error: user id not found");
        if (user) return res.send(user);
        else res.status(404).send("Error: username not found");
    })
})


// GET /user/:username, URL params
router.get('/:username', function(req,res){
    if (!req.params.username) return res.status(404).send("invalid username");
    User.findOne({username:req.params.username}, function(err, user){
        if (err) return res.status(404).send("Error: username not found");
        if (user) return res.send(user);
        else res.status(404).send("Error: username not found");
    })
})




module.exports = router;