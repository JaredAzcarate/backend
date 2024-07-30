import { Router } from "express";
import { createUserController, getUserByIdController, getUsersController, updateUserController } from "../controllers/user.controller.js";
import { generateUsers } from "../utils/createFakeUsers.js";

const router = Router()

/* router.get("/", getUsersController)
router.get("/:uid", getUserByIdController)
router.post("/create-user", createUserController)
router.put("/update-user/:uid", updateUserController) */

router.get('/faker', (req, res) => {
    try {
        const usuarios = generateUsers();
        res.send({ status: 'success', payload: usuarios });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

export default router