const express = require('express');
const { getAllUsers } = require('../controllers/userController');

const userRouter = express.Router();


userRouter.get('/api/users', getAllUsers);

userRouter.post('/api/users')

module.exports = userRouter;