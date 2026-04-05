//Importación de los módulos requeridos
import CourseService from "../services/course.service.js"
//Declaración y exportación de la clase CourseController
export default class CourseController {
    // Crear un curso
    static async createCourse(req, res, next) {
        try {
            const course = await CourseService.createCourse(req.body)
            res.status(201).json({
                status: "success",
                message: "Curso creado exitosamente",
                data: course
            })
        } catch (error) {
            next(error)
        }
    }
    // Obtener todos los cursos
    static async getAllCourses(req, res, next) {
        try {
            const courses = await CourseService.getAllCourses()
            res.status(200).json({
                status: "success",
                message: "Cursos obtenidos exitosamente",
                data: courses
            })
        } catch (error) {
            next(error)
        }
    }
    // Obtener un curso por su id
    static async getForId(req, res, next) {
        try {
            const { id } = req.params
            const course = await CourseService.getForId(id)
            res.status(200).json({
                status: "success",
                message: "Curso encontrado exitosamente",
                data: course
            })
        } catch (error) {
            next(error)
        }
    }
    // Obtener cursos por atributo/s particular/es
    static async getForAttribute(req, res, next) {
        try {
            const attribute = req.query
            const courses = await CourseService.getForAttribute(attribute)
            if(courses.length === 0){
                return next()
            }else{
                res.status(200).json({
                    status: "success",
                    message: "Cursos encontrados exitosamente",
                    data: courses
                })
            }
        } catch (error) {
            next(error)
        }
    }
    // Actualizar un curso por completo o de manera parcial
    static async updateCourse(req, res, next) {
        try {
            const { id } = req.params
            const course = await CourseService.updateCourse(id, req.body)
            res.status(200).json({
                status: "success",
                message: "Curso actualizado exitosamente",
                data: course
            })
        } catch (error) {
            next(error)
        }
    }
    // Eliminar un curso por el id
    static async deleteCourse(req, res, next) {
        try {
            const { id } = req.params
            await CourseService.deleteCourse(id)
            res.status(200).json({
                status: "success",
                message: "Curso eliminado exitosamente",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }
}