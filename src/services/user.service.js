//Importación de los módulos requeridos
import UserModel from "../models/user.model.js"
import AppError from "../utils/errorCustom.js" 

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
            throw new AppError("Aún no hay usuarios registrados", 404) 
        }else{
            return users
        }
    }
    //Obtener un usuario por el email
    static async findByEmail(email){
        return await UserModel.getByEmail(email)
    }
    //Obtener un usuario por el email sin mostrar el hash de la contraseñas
    static async getForAttribute(email){
        const user = await UserModel.getByEmailSafe(email)

        if(!user){
            throw new AppError("No se encontró el usuario", 404)
        }else{
            return user
        }
    }
    //Actualizar un usuario por completo o de manera parcial
    static async update(email, data){
        const exists = await UserModel.getByEmail(email)
        if(!exists) throw new AppError("Usuario no encontrado", 404)

        return await UserModel.update(email, data)
    }
    //Eliminar un usuario por el email
    static async deleteUser(email){
        const exists = await UserModel.getByEmail(email)
        if(!exists) throw new AppError("Usuario no encontrado", 404)

        return await UserModel.remove(email)
    }
}