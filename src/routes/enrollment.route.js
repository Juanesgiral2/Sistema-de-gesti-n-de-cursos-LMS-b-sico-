// Importación de los módulos requeridos
import { Router } from "express"
import EnrollmentController from "../controllers/enrollment.controller.js"
import { verifyToken, hasRole } from "../middlewares/auth.middleware.js"
//Declaración del router
const enrollmetnRouter = Router()

// POST /enrollments — solo ESTUDIANTE
enrollmetnRouter.post(
    "/",
    verifyToken,
    hasRole("ESTUDIANTE"),
    EnrollmentController.createEnrollment
)

// GET /enrollments/my-courses — todos los roles autenticados
enrollmetnRouter.get(
    "/my-courses",
    verifyToken,
    EnrollmentController.getMyCourses
)

// DELETE /enrollments/:id — ADMIN y ESTUDIANTE
enrollmetnRouter.delete(
    "/:id",
    verifyToken,
    hasRole("ADMIN", "ESTUDIANTE"),
    EnrollmentController.deleteEnrollment
)
//Exportación del router
export default enrollmetnRouter