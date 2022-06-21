require('dotenv').config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path");
const PORT = process.env.PORT || 5000;

// database
const connectDB = require("./config/db");
connectDB();

// middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet.hidePoweredBy()); // or use helmet() for all protections

// routers
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/todo', require('./routes/todoRoutes'))


app.get('/', (req,res) => res.sendFile(path.join(__dirname,"/public/index.html")))
app.get('/test', (req,res)=>{res.send("ok")})


// 404 page
app.all('*', (req,res)=>res.status(404).send("404 not found"))

app.listen(PORT, () => console.log(`Server has started at port ${PORT}`))