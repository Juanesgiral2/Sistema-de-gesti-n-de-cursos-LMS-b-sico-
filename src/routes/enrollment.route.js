// Importación de los módulos requeridos
import { Router } from "express"
import EnrollmentController from "../controllers/enrollment.controller.js"
import { verifyToken, hasRole } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.js"
import createEnrollmentSchema from "../validators/enrollment.validator.js"
//Declaración del router
const enrollmentRouter = Router()

// POST /enrollments — solo ESTUDIANTE
enrollmentRouter.post(
    "/",
    verifyToken,
    hasRole("ESTUDIANTE"),
    validate(createEnrollmentSchema),
    EnrollmentController.createEnrollment
)

// GET /enrollments/my-courses — todos los roles autenticados
enrollmentRouter.get(
    "/my-courses",
    verifyToken,
    EnrollmentController.getAllEnrollmentsForUserId
)

// DELETE /enrollments/:id — ADMIN y ESTUDIANTE
enrollmentRouter.delete(
    "/:id",
    verifyToken,
    hasRole("ADMIN", "ESTUDIANTE"),
    EnrollmentController.deleteEnrollment
)
//Exportación del router
export default enrollmentRouter