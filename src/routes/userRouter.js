const express = require('express');
const { getAllUsers , createUser } = require('../controllers/userController');
const validateToken = require('../middlewares/validationToken');

const userRouter = express.Router();


userRouter.get('/api/users', validateToken, validateEmail , validateRole , getAllUsers);

userRouter.post('/api/users', createUser)

module.exports = userRouter;