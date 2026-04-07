//Importación de los módulos requeridos
import EnrollmentModel from "../models/enrollment.js"
import AppError from "../utils/errorCustom.js"

//Declaración y exportación de la clase EnrollmentService
export default class EnrollmentService{
    //Métodos
    //Crear una inscripción
    static async createEnrollment(data){
        return await EnrollmentModel.create(data)
    }
    //Ver las inscripciones vinculados con el id del usuario activo del sistema
    static async getAllEnrollments(id){
        const enrollments = await EnrollmentModel.getAll(id)

        if(enrollments.length === 0){
            throw new AppError("Aún no has hecho alguna inscripción a un curso", 404)
        }else{
            return enrollments
        }
    }
    //Oobtener inscripción por id
    static async getEnrollmentById(id){
        const enrollment = await EnrollmentModel.getForId(id)

        if(!enrollment){
            throw new AppError("No se encontró la inscripción", 404)
        }

        return enrollment
    }
    //Eliminar una inscripción por el id
    static async deleteEnrollment(id){
        const found = await EnrollmentModel.getForId(id)

        if(!found){
            throw new AppError("No se encontró la inscripción", 404)
        }

        return await EnrollmentModel.remove(id)
    }
}