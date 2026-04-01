//Importación de los módulos requeridos
import { v4 as uuidv4 } from "uuid"
import {db} from "../config/dataBase.js"
import { hashPassword } from "../utils/hash.js"
//Declaración y exportación de la clase UserModel
export default class UserModel {
    //Métodos
    //Crear un usuario
    async create(data) {
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
    async getAll() {
        return await db.user.findMany({})
    }
    //Obtener un usuario por el id
    async getForId(id) {
        return await db.user.findFirst({ where: { id } })
    }
    //Actualizar un usuario por completo o de manera parcial
    async update(id, data) {
        return await db.user.update({
            where: { id },
            data: { ...data }
        })
    }
    //Eliminar un usuario por el id
    async remove(id) {
        return await db.user.delete({ where: { id } })
    }
}