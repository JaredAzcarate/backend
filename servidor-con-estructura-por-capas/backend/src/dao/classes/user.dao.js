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

    getUserByEmail = async (email) => {
        try {
            const result = await userModel.findOne({email: email})
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

    updateUser = async (uid, updateDataUser) => {
        try {
            let result = await userModel.updateOne({ _id: uid }, { $set: updateDataUser })
            return result
        } catch (error) {
            console.log(error)
        }
    }
}