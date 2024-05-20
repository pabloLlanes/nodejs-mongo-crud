const { body, validationResult } = require('express-validator');

const userValidation = [

    body('name').trim().not().isEmpty().isLength({ min: 6 }).withMessage('El nombre es obligatorio.'),
    body('name').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido.'),
    body('password').isLength({ min: 6, max: 10 }).withMessage('La contraseña debe tener al menos 6 caracteres y como maximo 10 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        next();
    }
];

module.exports = { userValidation };