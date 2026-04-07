//Importación de los módulos requeridos
import CourseModel from "../models/course.model.js"
import AppError from "../utils/errorCustom.js"

//Declaración y exportación de la clase CourseService
export default class CourseService{
    //Métodos
    //Crear curso
    static async createCourse(data){
        return await CourseModel.create(data)
    }
    //Obtener todos los cursos
    static async getAllCourses(){
        const courses = await CourseModel.getAll()

        if(courses.length === 0){
            throw new AppError("Aún no hay cursos registrados", 404)
        }else{
            return courses
        }
    }
    //Obtener un curso por su id
    static async getForId(id){
        const course = await CourseModel.getForId(id)

        if(!course){
            throw new AppError("No se encontró este curso", 404)
        }else{
            return course
        }
    }
    //Obtener un curso por un/os atributo/s particulares
    static async getForAttribute(attribute){
        const courses = await CourseModel.getForAtribute(attribute)

        if(courses.length === 0){
            return []
        }else{
            return courses
        }
    }
    //Actualizar por completo o de manera parcial
    static async updateCourse(id,data){
        const found = await CourseModel.getForId(id)

        if(!found){
            throw new AppError("No se encontró el curso", 404)
        }

        return await CourseModel.update(id,data)
    }
    //Eliminar un curso por el id
    static async deleteCourse(id){
        const found = await CourseModel.getForId(id)

        if(!found){
            throw new AppError("No se encontró el curso", 404)
        }

        return await CourseModel.remove(id)
    }
}