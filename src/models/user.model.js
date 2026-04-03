//Importación de los módulos requeridos
import { v4 as uuidv4 } from "uuid"
import {db} from "../config/dataBase.js"
import { hashPassword } from "../utils/hash.js"
//Declaración y exportación de la clase UserModel
export default class UserModel {
    //Métodos
    //Crear un usuario
    static async create(data) {
        const { name, email, password, role } = data
        return await db.user.create({
            data: {
                id: uuidv4(),
                name,
                email,
                password: await hashPassword(password),
                role
            }
        })
    }
    //Obtener todos los usuarios
    static async getAll() {
        return await db.user.findMany({})
    }
    //Obtener un usuario por un campo particular
    static async getForAttribute(attribute) {
        return await db.user.findFirst({ where: { attribute } })
    }
    //Actualizar un usuario por completo o de manera parcial
    static async update(email, data) {
        return await db.user.update({
            where: { email },
            data: { ...data }
        })
    }
    //Eliminar un usuario por el email
    static async remove(email) {
        return await db.user.delete({ where: { email } })
    }
}