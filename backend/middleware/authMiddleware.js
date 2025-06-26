import jwt from 'jsonwebtoken';
import { sercretKey } from '../config.js';
const JWT_SECRET = process.env.JWT_SECRET || sercretKey;

const auth = async (request, response, next) => {
    let token = request.header('Authorization');

    if (!token) {
        return response.status(401).json({ message: 'No token, Authorizaton denied' });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7).trim();
    }

    console.log("Processed Token:", token); // Debugging
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("grhh", decoded)
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).send({ message: 'Token is invalid' });
    }
};

export default auth;