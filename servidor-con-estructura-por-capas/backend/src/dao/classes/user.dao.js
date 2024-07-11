import userModel from "../models/user.model.js"

export default class UserManager {

    getUsers = async () => {
        try {
            const result = await userModel.find()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getUserById = async (uid) => {
        try {
            const result = await userModel.findById(uid)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    createNewUser = async (user) => {
        try {
            const result = await userModel.create(user)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateUser = async (uid, user) => {
        try {
            let result = await userModel.updateOne({ _id: uid }, { $set: user })
            return result
        } catch (error) {
            console.log(error)
        }
    }
}