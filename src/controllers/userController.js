const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function getAllUsers(req , res) {
    try {

        const users = await User.find();

        res.status(200).json({ message: 'Usuarios recuperados exitosamente', usuarios: users });


    } catch (error) {
  
      res.status(500).json({ message: 'error cuando se intenta getAllUsers' });
    }

}

async function createUser(req , res) {
    try {

      console.log(req.body);
      const {name, email ,password } = req.body;
      

      const hashedPassword = await bcrypt.hash(password , 10);

      const newUser = new User({name , email , password: hashedPassword });

      await newUser.save();

      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });

    } catch (error) {
  
      res.status(500).json({ message: 'error cuando se intenta getAllUsers' });
    }

}


module.exports = {getAllUsers ,createUser }


