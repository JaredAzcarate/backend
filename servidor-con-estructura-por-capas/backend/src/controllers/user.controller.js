import UserManager from "../dao/classes/user.dao.js";
import UserDTO from "../dto/user.dto.js";
import { createHash } from "../utils/user.utils.js";


const userController = new UserManager

export const getUsersController = async (req, res) => {
    let result = await userController.getUsers()
    res.send({status:'sucess', result})
} 

export const getUserByIdController = async (req, res) => {
    const { uid } = req.params
    let result = await userController.getUserById(uid)
    res.send({status:'sucess', result})
} 

export const viewSignUpController = async (req, res) => {

    res.render('signup')
} 

export const viewUpdatePasswordController = async (req, res) => {

    res.render('update-password')
} 

export const viewProfileController = async (req, res) => {
    const userId = req.user.id;  // Usamos el ID del JWT para consultar a la base de datos

    try {
        const user = await userController.getUserById(userId);
        
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Convertimos el usuario en un objeto plano
        const userPlain = user.toObject();

        res.render("my-account", { user: userPlain });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los datos del perfil");
    }
};

export const signUpController = async (req, res) => {
    const { first_name, last_name, address, email, age, password, role } = req.body;

    const allowedRoles = ['user', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    const newUser = new UserDTO({
        first_name,
        last_name,
        address,
        email,
        age,
        password,
        role: userRole
    });

    const result = await userController.createNewUser(newUser);
    if (!result) {
        return res.status(500).send('Error al crear el usuario');
    }

    res.status(201).render('login');
};

export const updatePasswordController = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const result = await userController.updatePassword(email, newPassword)

        res.redirect("/api/auth/login")
        
    } catch (error) {
        res.json({ error: error });
    }
};

export const viewEditProfileController = async (req, res) => {
    const userId = req.user.id;  // Usamos el ID del JWT para hacer la consulta a la base de datos

    try {
        const user = await userController.getUserById(userId);
        
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const userPlain = user.toObject();

        res.render("edit-account", { user: userPlain });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los datos del usuario");
    }
};

export const updateUserController = async (req, res) => {
    const { first_name, last_name, address, email, age } = req.body;
    const userId = req.user.id;

    try {
        const updatedUser = await userController.getUserById(userId);
        
        if (!updatedUser) {
            return res.status(404).send("Usuario no encontrado");
        }

        /* Actualizar los datos del usuario */
        updatedUser.first_name = first_name || updatedUser.first_name;
        updatedUser.last_name = last_name || updatedUser.last_name;
        updatedUser.address = address || updatedUser.address;
        updatedUser.email = email || updatedUser.email;
        updatedUser.age = age || updatedUser.age;

        await updatedUser.save();

        res.redirect("/api/users/profile/my-account");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el perfil");
    }
};
