import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth/auth.js';
import userModel from '../dao/models/user.model.js'
import { createHash, isValiPassword } from '../utils.js';
import passport from 'passport';

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

/* Ruta de restore */
router.get("/restore", (req, res) => {
    res.render('restorePassword')
})

/* Ruta de restore */
router.get("/error", (req, res) => {
    res.render('errorPage', {title:'Error', description:'Ocurrio un error al registrar su usuario'})
})

/* Funcion para registrars usuario */
router.post('/register',passport.authenticate('register', {failureRedirect:'error'}), async (req, res) => {
    res.redirect('/api/session/login')
});

/* Funcion para registrar admin */
router.post('/register/admin', async (req, res) => {
    const { name, lastname, email, password, role } = req.body;
    try {
        const user = await userModel.create({
            name: name,
            lastname: lastname,
            email: email,
            password: createHash(password),
            role: role
        })

        res.redirect('/api/session/login')
        
    } catch (error) {

        res.json({ message: error });
    }
});

/* Funcion para hacer login */
router.post('/login',passport.authenticate('login', {failureRedirect: 'error'}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Datos incompletos" })
    }
    try {

        req.session.user = {
            name: req.user.name,
            lastname: req.user.lastname,
            email: req.user.email,
            role: req.user.role,
        }

        res.redirect("/api/users/profile")
        
    } catch (error) {
        res.status(500).send('Error al iniciar sesión');
    }
});

/* Funcion para acceder con github */
router.get("/github", passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})


router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),async(req,res)=>{
    req.session.user=req.user
    res.redirect("/api/users/profile")
})

/* Funcion para hacer restaurar contaseña */
router.post('/restore', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email})

        if (!user) {

            return res.json({error: `El usuario ${email} no existe`})
        }
        
        user.password = createHash(password)

        user.save()

        res.redirect("/api/session/login")
        
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