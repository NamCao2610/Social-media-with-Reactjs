const jwt = require('jsonwebtoken');
const config = require('config');

module.exports= function(req , res, next) {
    //Lay token tu header
    const token = req.header('x-auth-token');

    //Check neu khong co token
    if(!token) {
        return res.status(401).json({ msg: 'Khong tim thay token , truy cap bi tu choi'});
    }

    //Kiem tra token
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));

        req.user = decode.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token khong hop le '});
    } 
}