const User = require('../models/userModel');

async function getAllUsers(req , res) {
    try {

        const users = await User.find();

        res.status(200).json({ message: 'Usuarios recuperados exitosamente', usuarios: users });


    } catch (error) {
  
      res.status(500).json({ message: 'error cuando se intenta getAllUsers' });
    }

}


module.exports = {getAllUsers}


