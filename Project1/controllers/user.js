const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allDbUser = await User.find({})
    return res.json(allDbUser)
}
async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found!' })
    return res.json(user)
}
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({
        status: 'success',
        message: 'User Deleted successfully',
    });
}
async function handleUpdateUserById(req, res) {
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
}

async function handleCreateNewUser(req, res) {
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

    return res.status(201).json({ message: 'success', id: result._id })
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}