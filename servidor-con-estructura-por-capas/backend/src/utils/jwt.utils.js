import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (user) => {
    /* Aca defino los datos que quiero codificar en el token*/
    const tokenData = {
        id: user._id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        address: user.address,
        age: user.age,
        role: user.role               
    };

    /* Genero el token con los datos especificados */
    return jwt.sign(tokenData, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};