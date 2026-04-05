//Importación de los módulos requeridos
import EnrollmentService from "../services/enrollment.service.js"
//Exportación y declaración de la clase EnrollmentController
export default class EnrollmentController {
    // Crear una inscripción
    static async createEnrollment(req, res, next) {
        try {
            const enrollment = await EnrollmentService.createEnrollment(req.body)
            res.status(201).json({
                status: "success",
                message: "Inscripción creada exitosamente",
                data: enrollment
            })
        } catch (error) {
            next(error)
        }
    }
    // Ver las inscripciones del usuario activo
    static async getAllEnrollmentsForUserId(req, res, next) {
        try {
            const { id } = req.user
            const enrollments = await EnrollmentService.getAllEnrollments(id)
            res.status(200).json({
                status: "success",
                message: "Inscripciones obtenidas exitosamente",
                data: enrollments
            })
        } catch (error) {
            next(error)
        }
    }
    // Eliminar una inscripción por el id
    static async deleteEnrollment(req, res, next) {
        try {
            const { id } = req.params
            await EnrollmentService.deleteEnrollment(id)
            res.status(200).json({
                status: "success",
                message: "Inscripción eliminada exitosamente",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }
}