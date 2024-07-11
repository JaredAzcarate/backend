import { loginUser } from '../services/auth.jwt.services.js';

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser(email, password);
        res.send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
