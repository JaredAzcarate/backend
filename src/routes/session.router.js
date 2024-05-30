import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth/auth.js';
import userModel from '../dao/models/user.model.js'

const router = Router();

/* Ruta de login */
router.get("/login", (req, res) => {
    res.render('login')
})

/* Ruta de register */
router.get("/register", (req, res) => {
    res.render('register')
})

/* Ruta de register */
router.get("/register/admin", (req, res) => {
    res.render('registerAdmin')
})

/* Funcion para registrars usuario */
router.post('/register', async (req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
        const user = await userModel.create({
            name: name,
            lastname: lastname,
            email: email,
            password: password
        })

        res.redirect('/api/session/login')
        
    } catch (error) {

        res.json({ message: error });
    }
});

/* Funcion para registrar admin */
router.post('/register/admin', async (req, res) => {
    const { name, lastname, email, password, role } = req.body;
    try {
        const user = await userModel.create({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            role: role
        })

        res.redirect('/api/session/login')
        
    } catch (error) {

        res.json({ message: error });
    }
});

/* Funcion para hacer login */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email})

        if (!user) {

            return res.json({error: `El usuario ${email} no existe`})
        }

        if (user.password === password) {

            req.session.user = {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            }

            return res.redirect("/api/users/profile")
        }
        
        else{

            return res.json({message: "Contraseña errada, intente nuevamente."})
        }
        
    } catch (error) {
        res.json({ error: error });
    }
});

/* Funcion para hacer logout */
router.post('/logout', (req, res) => {
    req.session.destroy( err => {
        if (err) {
           return res.send('Error al hacer logout')
        }
        
        res.redirect('/api/session/login')

    } )
})



export default router;