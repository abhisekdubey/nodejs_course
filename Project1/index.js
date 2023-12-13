const express = require('express');
require('dotenv').config();
const { connectMongoDB } = require('./connection')

const { logReqRes } = require('./middlewares')
const userRouter = require('./routes/user')

const app = express()
const PORT = process.env.PORT || 8000;

// mongo connection
connectMongoDB(`${process.env.MONGODB_URI}/nodejs`)

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))
// Middleware
logReqRes('log.txt')

// Routes
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log(`Server Started at Port number ${PORT}`))