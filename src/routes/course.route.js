// Importación de los módulos requeridos
import { Router } from "express"
import CourseController from "../controllers/course.controller.js"
import { verifyToken, hasRole } from "../middlewares/auth.middleware.js"
//Declaración del courseRouter
const courseRouter = Router()

// POST /courses — ADMIN e INSTRUCTOR
courseRouter.post(
    "/",
    verifyToken,
    hasRole("ADMIN", "INSTRUCTOR"),
    CourseController.createCourse
)

// GET /courses — público
courseRouter.get(
    "/",
    CourseController.getForAttribute,
    CourseController.getAllCourses
)

// GET /courses/:id — público
courseRouter.get(
    "/:id",
    CourseController.getForId
)

// PATCH /courses/:id — solo ADMIN
courseRouter.patch(
    "/:id",
    verifyToken,
    hasRole("ADMIN"),
    CourseController.updateCourse
)

// DELETE /courses/:id — solo ADMIN
courseRouter.delete(
    "/:id",
    verifyToken,
    hasRole("ADMIN"),
    CourseController.deleteCourse
)
//Exportación del router
export default courseRouter