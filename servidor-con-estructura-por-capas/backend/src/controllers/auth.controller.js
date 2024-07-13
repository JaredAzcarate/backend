import UserManager from '../dao/classes/user.dao.js';
import { loginUser } from '../services/auth.jwt.services.js';
import { createHash } from '../utils/user.utils.js';

const userManager = new UserManager

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser(email, password);

        /* Almaceno el token en cookies */
        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true, 
            secure: true,
            sameSite: 'strict'
        });
        
        res.send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const logOutController = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        
        res.status(200).send({ status: 'success', message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const resetPasswordController = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await userManager.getUserByEmail(email)

        if (!user) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }

        const updatePassword = {
            password: createHash(newPassword)
        }

        await userManager.updateUser(user._id, updatePassword)

        res.status(200).send({ status: 'success', message: 'Password updated successfully' });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const testController = async (req, res) => {

    try {
        const userAuth = req.user

        res.status(200).send({ status: 'success', message: 'Este usuario esta autenticado', userAuth });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};