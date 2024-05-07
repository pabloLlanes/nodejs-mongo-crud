function roleCheck(roleParam) {

    return function (req, res, next) {

        const user = req.user;

        console.log('USER IN ROLE CHECK: ', user);
        console.log('PARAMETRO ROLE: ', roleParam);

        if (user && user.role === roleParam) {
            next();
        } else {
            res.status(403).json({ message: "ACCESO DENEGADO, ROLE INCORRECTO", roleRequired: roleParam })
        }
    }
}


module.exports = { roleCheck }