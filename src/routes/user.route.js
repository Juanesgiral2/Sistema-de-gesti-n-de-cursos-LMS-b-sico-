// Importación de los módulos requeridos
import { Router } from "express"
import UserController from "../controllers/user.controller.js"
import { verifyToken, hasRole } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.js"
import { updateUserSchema } from "../validators/user.validator.js"
//Declaración del userRouter
const userRouter = Router()

// GET /users — solo ADMIN
userRouter.get(
    "/",
    verifyToken,
    hasRole("ADMIN"),
    UserController.getAllUsers
)

// GET /users/:email — ADMIN e INSTRUCTOR
userRouter.get(
    "/:email",
    verifyToken,
    hasRole("ADMIN", "INSTRUCTOR"),
    UserController.getForAttribute
)

// PATCH /users/:email — solo ADMIN
userRouter.patch(
    "/:email",
    verifyToken,
    hasRole("ADMIN"),
    validate(updateUserSchema),
    UserController.update
)

// DELETE /users/:email — solo ADMIN
userRouter.delete(
    "/:email",
    verifyToken,
    hasRole("ADMIN"),
    UserController.deleteUser
)

//Exportación del router
export default userRouter