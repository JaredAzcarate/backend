import OrderManager from '../dao/classes/order.dao.js';
import UserManager from '../dao/classes/user.dao.js';
import orderModel from '../dao/models/order.model.js';
import { loginUser } from '../services/auth.jwt.services.js';
import { verifyToken } from '../utils/jwt.utils.js';
import { createHash } from '../utils/user.utils.js';

const userManager = new UserManager
const orderManager = new OrderManager

export const viewLoginController = async (req, res) => {

    try {
        res.render('login')
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const viewForgotPasswordController = async (req, res) => {

    try {
        res.render('forgot-password')
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    const { email, password } = req.body; 
    const sessionId = req.cookies.sessionId;
    const getOrderIdCookies = req.cookies.oid;

    try {
        const token = await loginUser(email, password);

        /* Almaceno el token en cookies */
        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true, 
            secure: true,
            sameSite: 'strict'
        });

        /* Decodifico el token para obtener el id del ususario */
        const decodedToken = verifyToken(token);
        const userId = decodedToken.id;

        /* Almaceno el id del usuario en mi cookie y se substituye por el id anonimo */
        res.cookie('sessionId', userId, { httpOnly: true, secure: true });

        /* Si existe un carrito entonces le asigno el id del usuario al atributo "user" */
        if (getOrderIdCookies) {
            const order = await orderManager.getOrder(getOrderIdCookies);
            if (order) {
                order.user = userId;
                await order.save();
            }
        }
        
        res.redirect(`/api/order/checkout/${userId}`);
        /* res.send({ auth: true, token }); */
    } catch (error) {
        res.status(404).render('404',{ status:404, message: 'Al parecer colocaste alguna información incorrecta.', error: error, redirect: '/api/auth/login' });
    }
};

export const logOutController = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.redirect('/');
        /* res.status(200).send({ status: 'success', message: 'Logout successful' }); */
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const forgotPasswordController = async (req, res) => {
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

        res.render('login')
        /* res.status(200).send({ status: 'success', message: 'Password updated successfully' }); */
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
