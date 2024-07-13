import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (user) => {
    /* Aca defino los datos que quiero codificar en el token*/
    return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};