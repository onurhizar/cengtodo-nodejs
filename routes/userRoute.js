const express = require("express");
const router = express.Router();
const User = require("../models/User");


// GET /api/user/ ::: Lists users
router.get('/', function(req,res){
    const returningFields = "_id username role"; // only return this fields of data
    User.find({}, returningFields ,function(err,users){
        if (err) {
            const errorBody = {error: {code:"mongoose", message: err.message}}
            console.log(errorBody.error.code, err.message)
            return res.status(400).json(errorBody)
        }
        return res.status(200).json(users)
    })
    }
)

// POST /api/user/ with json body , REGISTER PAGE
router.post('/', async function(req,res){
    // 1: check if given post body is empty
    if (!req.body.username) {
        const errorBody = {error: {code:"ef-usr", message: "Username field is empty"}}
        return res.status(400).json(errorBody);
    }
    if (!req.body.password) {
        const errorBody = {error: {code:"ef-psw", message: "Password field is empty"}}
        return res.status(400).json(errorBody);
    }

    // 2: if not empty, check if username exists..
    const result = await User.findOne({username: req.body.username})
    if (result) {
        const errorBody = {error: {code:"exists", message: "user exists"}}
        return res.status(400).json(errorBody);
    }

    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
})


// GET /user/id/:userId, URL params
router.get('/id/:userId', function(req,res){
    if (!req.params.userId) {
        const errorBody = {error: {code:"invalid-id", message: "Given ID is invalid"}}
        return res.status(400).json(errorBody);
    }
    User.findById(req.params.userId, function(err, user){
        if (err) {
            const errorBody = {error:{code:"invalid-id", message: err.message}}
            return res.status(400).json(errorBody);
        }
        if (user) return res.json(user);
        else res.status(400).json({error:{code:"invalid-id", message: "id not found"}});
    })
})


// GET /user/:username, URL params
router.get('/:username', function(req,res){
    if (!req.params.username) {
        const errorBody = {error:{code:"invalid-id", message: "invalid username"}}
        return res.status(400).json(errorBody);
    }
    User.findOne({username:req.params.username}, function(err, user){
        if (err) {
            const errorBody = {error:{code:"invalid-id", message: err.message}}
            return res.status(400).json(errorBody);
        }
        if (user) return res.status(200).json(user);
        else res.status(400).json({error:{code:"invalid-id", message:"user not found"}});
    })
})




module.exports = router;