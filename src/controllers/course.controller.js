//Importación de los módulos requeridos
import CourseService from "../services/course.service.js"
import logger from "../config/logger.js"
//Declaración y exportación de la clase CourseController
export default class CourseController {
    // Crear un curso
    static async createCourse(req, res, next) {
        try {
            const course = await CourseService.createCourse(req.body)
            logger.info("Curso creado exitosamente", { courseId: course.id, body: req.body })
            res.status(201).json({
                status: "success",
                message: "Curso creado exitosamente",
                data: course
            })
        } catch (error) {
            logger.error(error, { body: req.body })
            next(error)
        }
    }
    // Obtener todos los cursos
    static async getAllCourses(req, res, next) {
        try {
            const courses = await CourseService.getAllCourses()
            logger.info("Cursos obtenidos exitosamente", { count: courses.length })
            res.status(200).json({
                status: "success",
                message: "Cursos obtenidos exitosamente",
                data: courses
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
    // Obtener un curso por su id
    static async getForId(req, res, next) {
        try {
            const { id } = req.params
            const course = await CourseService.getForId(id)
            logger.info("Curso encontrado exitosamente", { courseId: id })
            res.status(200).json({
                status: "success",
                message: "Curso encontrado exitosamente",
                data: course
            })
        } catch (error) {
            logger.error(error, { courseId: req.params.id })
            next(error)
        }
    }
    //Obtener cursos por atributos particulares
    static async getCoursesOrFilter(req, res, next) {
        try {
            const hasFilters = Object.keys(req.query).length > 0

            if (hasFilters) {
                const courses = await CourseService.getForAttribute(req.query)
                if (courses.length === 0) {
                    logger.warn("No se encontraron cursos con los atributos dados", { query: req.query })
                    return res.status(200).json({
                        status: "success",
                        message: "No se encontraron cursos con esos criterios",
                        data: []
                    })
                }
                logger.info("Cursos filtrados exitosamente", { count: courses.length, query: req.query })
                return res.status(200).json({
                    status: "success",
                    message: "Cursos encontrados exitosamente",
                    data: courses
                })
            } else {
                const courses = await CourseService.getAllCourses()
                logger.info("Cursos obtenidos exitosamente", { count: courses.length })
                return res.status(200).json({
                    status: "success",
                    message: "Cursos obtenidos exitosamente",
                    data: courses
                })
            }
        } catch (error) {
            logger.error(error, { query: req.query })
            next(error)
        }
    }
    // Actualizar un curso por completo o de manera parcial
    static async updateCourse(req, res, next) {
        try {
            const { id } = req.params
            const course = await CourseService.updateCourse(id, req.body)
            logger.info("Curso actualizado exitosamente", { courseId: id, body: req.body })
            res.status(200).json({
                status: "success",
                message: "Curso actualizado exitosamente",
                data: course
            })
        } catch (error) {
            logger.error(error, { courseId: req.params.id, body: req.body })
            next(error)
        }
    }
    // Eliminar un curso por el id
    static async deleteCourse(req, res, next) {
        try {
            const { id } = req.params
            await CourseService.deleteCourse(id)
            logger.info("Curso eliminado exitosamente", { courseId: id })
            res.status(200).json({
                status: "success",
                message: "Curso eliminado exitosamente",
                data: null
            })
        } catch (error) {
            logger.error(error, { courseId: req.params.id })
            next(error)
        }
    }
}