const express = require('express');
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = process.env.PORT || 8000;

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
        const id = req.params.id;
        const user = users.find(user => user.id === id)
        return res.json({
            // TODO: Edit existing user with id
            status: 'pending'
        })
    })
    .delete((req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id === id)
        return res.json({
            // TODO: Delete user with id
            status: 'pending'
        })
    })

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// })

app.post('/api/users', (req, res) => {
    return res.json({
        // TODO: Create new user
        status: 'pending'
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