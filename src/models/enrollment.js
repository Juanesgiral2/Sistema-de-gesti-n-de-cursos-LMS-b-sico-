//Importación de los módulos requeridos
import {v4 as uuidv4} from "uuid"
import {db} from "../config/dataBase.js"
//Declaración de la clase EnrollmentModel
export default class EnrollmentModel{
    //Métodos
    //Crear una inscripción
    static async create (data){
        const {studentId,courseId} = data

        return await db.enrollment.create({
            data:{
                id:uuidv4(),
                studentId,
                courseId
            }
        })
    }
    //Ver las inscripciones vinculados con el id del usuario activo del sistema
    static async getAll(id){
        return await db.enrollment.findMany({
            where:{
                userId:id
            }
        })
    }
    //Eliminar una inscripción por el id
    static async remove (id){
        return await db.enrollment.delete({
            where:{
                id
            }
        })
    }
}