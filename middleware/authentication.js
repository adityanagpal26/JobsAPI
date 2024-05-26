const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const dotenv= require('dotenv');
dotenv.config();

const authentication= (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    token = token.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new UnauthenticatedError('Authentication invalid');
        }
        req.user = decoded;
        next();
    })
}

module.exports = authentication;
