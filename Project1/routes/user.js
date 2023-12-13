const express = require('express');
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require('../controllers/user')

const router = express.Router();

// Routes
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

// merge common similar route or grouping
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;