//Importación de los módulos requeridos
import {v4 as uuidv4} from "uuid"
import {db} from "../config/dataBase.js"
//Declaración y exportación de la clase CourseModel
export default class CourseModel{
    //Métodos
    //Crear curso
    async create (data){
        const {title,description,level,instructorId} = data

        return await db.course.create({
            data:{
                id:uuidv4(),
                title,
                description,
                level,
                instructorId
            }
        })
    }
    //Obtener todos los cursos
    async getAll (){
        return await db.course.findMany({})
    }
    //Obtener un curso por su id
    async getForId (id){
        return await db.course.findFirst({
            where:{
                id
            }
        })
    }
    //Obtener un curso por un/os atributo/s particulares
    async getForAtribute (data){
        return await db.course.findMany({
            where:{
                ...data
            }
        })
    }
    //Actualizar por completo o de manera parcial un curso
    async update (id,data){
        return await db.course.update({
            where:{
                id
            },
            data:{
                ...data
            }
        })
    }
    //Eliminar un curso por el id
    async remove (id){
        return await db.course.delete({
            where:{
                id
            }
        })
    }
}