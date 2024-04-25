const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateJwt } = require('../libs/jwt');


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

const login = async (req, res) => {

    try {
      
        const { email, password } = req.body;

        if(!email || !password ) {
            return res.status(404).json({ message: 'NO ENVIASTE EL EMAIL o PASSWORD, para el logueo es requerido' });
        }
     
        //const user = await User.findOne({ email: email})
        const user = await User.findOne({ email });

        if(!user) {
            console.log('usuario no encontrado');
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        console.log('PASSWORD USUARIO' + password);
        console.log('PASSWORD DB' + user.password);
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log(isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateJwt({id:user._id , email: user.email })

        console.log(token);
   
        res.status(201).json({ message: 'Logueo exitoso', user: user , token: token });
    
    } catch (error) {
        
        res.status(500).json({ message: 'Error al crear el usuario'});

    }

}


module.exports = {
    register,
    login
}