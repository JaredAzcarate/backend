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

export const createUserController = async (req, res) => {

    const userData = new UserDTO(req.body);

    let result = await userController.createNewUser(userData)

    res.send({status:'sucess', result})
} 

export const updateUserController = async (req, res) => {
    const { uid } = req.params
    const userData = new UserDTO.Update(req.body);

    let result = await userController.updateUser(uid, userData)

    res.send({status:'sucess', result})
} 