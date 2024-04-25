const jwt = require('jsonwebtoken');


const validateToken = (req, res, next ) => {
    
try {
    const token = req.headers.authorization;

    console.log({token});

    if(!token) {
        return res.status(401).json({ message: 'Acceso denegado, token requerido' });

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;


    
    console.log(req.user);

    next();
} catch (error) {

    return res.status(400).json({ message: 'Fail Token', details: error.message });


}





}

module.exports = validateToken;
