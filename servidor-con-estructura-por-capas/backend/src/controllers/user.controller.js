import UserManager from "../dao/classes/user.dao.js";
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

export const createUserController = async (req, res) => {

    const { first_name, last_name, age, email, password, role } = req.body;

    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password),
        role: role
    }

    let result = await userController.createNewUser(user)

    res.send({status:'sucess', result})
} 

export const updateUserController = async (req, res) => {
    const { uid } = req.params
    const { first_name, last_name, age, email } = req.body;

    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
    }

    let result = await userController.updateUser(uid, user)

    res.send({status:'sucess', result})
} 