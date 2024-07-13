import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.utils.js';
import UserModel from '../dao/models/user.model.js';

export const loginUser = async (email, password) => {

    /* Verificar las credenciales del usuario con la base de datos */
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    /* Comparar contraseña proporcionada con la almacenada en la base de datos */
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    /* Generar el token JWT */
    const token = generateToken(user);
    
    return token;
};
