import passport from "passport";
import local from "passport-local"
import GitHubStrategy from 'passport-github2'
import userModel from "../dao/models/user.model.js";
import { createHash, isValiPassword, generateToken } from "../utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy (
        {passReqToCallback:true, usernameField:'email'}, async(req, username, password, done) => {
            const { first_name, last_name, age, email } = req.body
            try {
                const user = await userModel.findOne({email: username})
                if (user) {
                    console.log('El usuario ya existe');
                    return done(null,false)
                    
                }
                
                const newUser = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: email,
                    password: createHash(password),
                    role: 0
                })
                const access_token = generateToken(newUser)
                console.log(access_token);
                return done(null, newUser, { token: access_token })
                
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
                

                const access_token = generateToken(user)
                console.log(access_token);
                return done(null, user, { token: access_token })
                
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy({
        clientID: "Iv23lipjZ3XxytBdCwst",
        clientSecret: "bbb7d37b32f1baeabba1b15a71cfb96e334f5899",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",  
                    age: profile._json.age,  
                    email: profile._json.email,
                    password: ""
                }
                let result = await userModel.create(newUser)
                console.log(result);
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport