//Importación de los módulos requeridos
import UserModel from "../models/user.model.js"
//Declaración y exportación de la clase UserService
export default class UserService{
    //Métodos
    //Crear un usuario
    static async createUser(data){
        return await UserModel.create(data)
    }
    //Obtener todos los usuarios
    static async getAllUsers(){
        const users = await UserModel.getAll()

        if(users.length === 0){
            throw new Error("Aún no hay usuarios registrados")
        }else{
            return users
        }
    }
    //Obtener un usuario por un campo particular
    static async getForAttribute(attribute){
        const user = await UserModel.getForAttribute(attribute)

        if(!user){
            throw new Error("No se encontró el usuario")
        }else{
            return user
        }
    }
    //Actualizar un usuario por completo o de manera parcial
    static async update(email,data){
        const exists = await UserModel.getForAttribute(email)
         if(!exists) throw new Error("Usuario no encontrado")

        return await UserModel.update(email,data)
    }
    //Eliminar un usuarios por el email
    static async deleteUser(email){
        const exists = await UserModel.getForAttribute(email)
        if(!exists) throw new Error("Usuario no encontrado")

        return await UserModel.remove(email)
    }
}