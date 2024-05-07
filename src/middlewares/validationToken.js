const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    try {
        const token = req.headers.authorization;

        console.log(token)

        if (!token) {
            return res.status(401).json({ message: 'acceso denegado, token requerido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = decoded;

        next();
    } catch (error) {

        return res.status(400).json({ message: 'fail Token', details: error.message });

    }
}

module.exports = validateToken;
