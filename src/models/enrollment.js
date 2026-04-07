//Importación de los módulos requeridos
import {v4 as uuidv4} from "uuid"
import {db} from "../config/dataBase.js"
//Declaración y exportación de la clase EnrollmentModel
export default class EnrollmentModel{
    //Métodos
    //Crear una inscripción
    // [FIX #3] Renombrado studentId → userId para coincidir con el schema de Prisma
    static async create (data){
        const {studentId, courseId} = data

        return await db.enrollment.create({
            data:{
                id: uuidv4(),
                userId: studentId,   // [FIX #3] El schema usa "userId", no "studentId"
                courseId
            }
        })
    }
    //Ver las inscripciones vinculadas con el id del usuario activo del sistema
    static async getAll(id){
        return await db.enrollment.findMany({
            where:{
                userId: id    // [FIX #3] Campo correcto según schema Prisma
            }
        })
    }
    //Obtener una inscripción por el id
    static async getForId(id){
        return await db.enrollment.findFirst({
            where:{ id }
        })
    }
    //Eliminar una inscripción por el id
    static async remove (id){
        return await db.enrollment.delete({
            where:{ id }
        })
    }
}