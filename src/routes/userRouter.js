const express = require('express');
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const validateToken = require('../middlewares/validationToken');
const { roleCheck } = require('../middlewares/validationRole');

const userRouter = express.Router();

userRouter.get('/api/users', validateToken, roleCheck('GOD'), getAllUsers);

userRouter.post('/api/users', validateToken, roleCheck('ADMIN'), createUser);

userRouter.get('/api/users/:id', validateToken, getUserById);

userRouter.patch('/api/users/:id', updateUser);

userRouter.delete('/api/users/:id', validateToken, deleteUser);

module.exports = userRouter;