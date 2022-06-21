require('dotenv').config();
const mongoose = require('mongoose');

const db_username = process.env.MONGO_ATLAS_USERNAME;
const db_password = process.env.MONGO_ATLAS_PASSWORD;


async function connectDB(){
    if (!db_username || !db_password) {
        console.log("Credentials could not get from .env file");
        return null;
    }
    const joined = `${db_username}:${db_password}`
    const uri = `mongodb+srv://${joined}@iyte-ceng-todo-db.aux1spp.mongodb.net/?retryWrites=true&w=majority`
    
    try {
        await mongoose.connect(uri);
        console.log("Connected to the MongoDB");
    } catch (error) {
        console.log("Error while connecting to MongoDB!");
        console.error(error.message);
        process.exit(1); // exit process with failure
    }
}

module.exports = connectDB;