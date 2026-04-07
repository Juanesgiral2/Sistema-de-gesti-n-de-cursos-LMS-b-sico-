//Importación de los módulos requeridos
import EnrollmentService from "../services/enrollment.service.js"
import AppError from "../utils/errorCustom.js"
import logger from "../config/logger.js"
//Exportación y declaración de la clase EnrollmentController
export default class EnrollmentController {
    // Crear una inscripción
    static async createEnrollment(req, res, next) {
        try {
            const enrollment = await EnrollmentService.createEnrollment({
                studentId: req.user.id,        //Forzado desde el token
                courseId: req.body.courseId    // Solo se acepta courseId del body
            })
            logger.info("Inscripción creada exitosamente", { enrollmentId: enrollment.id, userId: req.user.id })
            res.status(201).json({
                status: "success",
                message: "Inscripción creada exitosamente",
                data: enrollment
            })
        } catch (error) {
            logger.error(error, { body: req.body })
            next(error)
        }
    }
    // Ver las inscripciones del usuario activo
    static async getAllEnrollmentsForUserId(req, res, next) {
        try {
            const { id } = req.user
            const enrollments = await EnrollmentService.getAllEnrollments(id)
            logger.info("Inscripciones obtenidas exitosamente", { userId: id, count: enrollments.length })
            res.status(200).json({
                status: "success",
                message: "Inscripciones obtenidas exitosamente",
                data: enrollments
            })
        } catch (error) {
            logger.error(error, { userId: req.user?.id })
            next(error)
        }
    }
    // Eliminar una inscripción por el id
    // [FIX #8] Verificar que la inscripción pertenece al usuario (salvo ADMIN)
    static async deleteEnrollment(req, res, next) {
        try {
            const { id } = req.params
            const enrollment = await EnrollmentService.getEnrollmentById(id)

            // [FIX #8] Solo el dueño o un ADMIN pueden eliminar
            if (req.user.role !== "ADMIN" && enrollment.userId !== req.user.id) {
                throw new AppError("No tienes permiso para eliminar esta inscripción", 403)
            }

            await EnrollmentService.deleteEnrollment(id)
            logger.info("Inscripción eliminada exitosamente", { enrollmentId: id })
            res.status(200).json({
                status: "success",
                message: "Inscripción eliminada exitosamente",
                data: null
            })
        } catch (error) {
            logger.error(error, { enrollmentId: req.params.id })
            next(error)
        }
    }
}