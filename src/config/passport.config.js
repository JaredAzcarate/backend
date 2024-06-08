import passport from "passport";
import local from "passport-local"
import userModel from "../dao/models/user.model.js";
import { createHash, isValiPassword } from "../utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy (
        {passReqToCallback:true, usernameField:'email'}, async(req, username, password, done) => {
            const { name, lastname, email } = req.body
            try {
                const user = await userModel.findOne({email: username})
                if (user) {
                    console.log('El usuario ya existe');
                    return done(null,false)
                    
                }
                
                const newUser = await userModel.create({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: createHash(password),
                    role: 0
                })

                return done(null, newUser)
                
            } catch (error) {

                return done("Error al obtener el usuario" + error, false)
            }
                }
    ))

    passport.use('login', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done) => {
            
            try {
                const user = await userModel.findOne({email: username})

                if (!user) {
                    return done(null, false, {error: `El usuario ${username} no existe`})
                }

                if (!isValiPassword(user, password)) {
                    return done(null, false, {message: "Contraseña errada, intente nuevamente."})
                }
                

                return done(null, user)
                
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport