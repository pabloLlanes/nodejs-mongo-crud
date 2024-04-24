const bcrypt = require('bcrypt');
const User = require('../models/userModel');


const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const salt = 10;
    
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            name, 
            email, 
            password: hashedPassword
        })
    

        await newUser.save();

        newUser.password = undefined;
    
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario'});

    }

}


module.exports = {
    register,
}