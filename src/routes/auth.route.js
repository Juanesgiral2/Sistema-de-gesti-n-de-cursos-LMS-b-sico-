// Importación de los módulos requeridos
import { Router } from "express"
import AuthController from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createUserSchema } from "../validators/user.validator.js"
//Declaración del router de auth
const authRouter = Router()
// POST /auth/register
authRouter.post(
    "/register",
    validate(createUserSchema),
    AuthController.registerUser
)
// POST /auth/login
authRouter.post(
    "/login",
    AuthController.login
)
//Exportación del router
export default authRouter