const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 8000;

// mongo connection
mongoose.connect(`${process.env.MONGODB_URI}/nodejs`)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log("MongoDB connection error : ", err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {
    timestamps: true
})

// Model
const User = mongoose.model("user", userSchema)

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// Middleware
app.use((req, res, next) => {
    fs.appendFile('log.txt', `Date - ${Date.now()} : IP - ${req.ip} : Method - ${req.method} : Path - ${req.path}\n`, (err, data) => {
        next()
    })
})

// Routes
app.get('/api/users', async (req, res) => {
    const allDbUser = await User.find({})
    res.setHeader('X-Developer', 'Abhisek Dubey')
    return res.json(allDbUser)
})

// merge common similar route or grouping
app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: 'User not found!' })
        return res.json(user)
    })
    .patch(async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                });
            }

            return res.json({
                status: 'success',
                message: 'User updated successfully',
                user: user,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({
            status: 'success',
            message: 'User Deleted successfully',
        });
    })

app.post('/api/users', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ message: 'All field are required!' })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    return res.status(201).json({ message: 'success' })
})

app.listen(PORT, () => console.log(`Server Started at Port number ${PORT}`))