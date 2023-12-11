const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// Middleware
app.use((req, res, next) => {
    fs.appendFile('log.txt', `Date - ${Date.now()} : IP - ${req.ip} : Method - ${req.method} : Path - ${req.path}\n`, (err, data) => {
        next()
    })
})

// Routes
app.get('/api/users', (req, res) => {
    return res.json(users)
})

// merge common similar route or grouping
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id)
        return res.json(user)
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        const user = users[userIndex];
        const updatedUser = { ...user, ...req.body };
        users[userIndex] = updatedUser;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({
                status: 'success',
                message: 'User updated successfully',
                user: updatedUser,
            });
        })
    })
    .delete((req, res) => {
        const id = req.params.id;
        const userIndex = users.findIndex(user => user.id === id)
        users.pop(userIndex)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({
                status: 'success',
                message: 'User Deleted successfully',
            });
        })
    })

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// })

app.post('/api/users', (req, res) => {
    const body = req.body;
    // users.push({
    //     first_name: body.first_name,
    //     last_name: body.last_name,
    //     email: body.email,
    //     gender: body.gender,
    //     job_title: body.job_title
    // })
    users.push({ id: users.length + 1, ...body })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({
            // TODO: Create new user
            status: 'success',
            id: users.length
        })
    })
})

// app.patch('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id === id)
//     return res.json({
//         // TODO: Edit existing user with id
//         status: 'pending'
//     })
// })

// app.delete('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id === id)
//     return res.json({
//         // TODO: Delete user with id
//         status: 'pending'
//     })
// })

app.listen(PORT, () => console.log(`Server Started at Port number ${PORT}`))