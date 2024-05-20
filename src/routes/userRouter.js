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
const { userValidation } = require('../middlewares/userValidation');

const userRouter = express.Router();

//userRouter.get('/api/users', validateToken, roleCheck('GOD'), getAllUsers);
userRouter.get('/api/users', getAllUsers);

//userRouter.post('/api/users', validateToken, userValidation, roleCheck('ADMIN'), createUser);
userRouter.post('/api/users', (_, __, next) => {
    console.log('MIRO COMO PASA, esto seria un middleware');
    next()
}, userValidation, createUser);

userRouter.get('/api/users/:id', /* validateToken, */ getUserById);

userRouter.patch('/api/users/:id', updateUser);

userRouter.delete('/api/users/:id', validateToken, deleteUser);

module.exports = userRouter;