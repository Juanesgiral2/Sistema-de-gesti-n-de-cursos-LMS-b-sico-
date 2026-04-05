//Importación de los módulos requeridos
import UserService from "../services/user.service.js"
//Declaración y exportación de la clase UserController
export default class UserController {
    // Crear un usuario
    static async createUser(req, res, next) {
        try {
            const user = await UserService.createUser(req.body)
            res.status(201).json({
                status: "success",
                message: "Usuario creado exitosamente",
                data: user
            })
        } catch (error) {
            next(error)
        }
    }
    // Obtener todos los usuarios
    static async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            res.status(200).json({
                status: "success",
                message: "Usuarios obtenidos exitosamente",
                data: users
            })
        } catch (error) {
            next(error)
        }
    }
    // Obtener un usuario por el email
    static async getForAttribute(req, res, next) {
        try {
            const email = req.params.email
            const user = await UserService.getForAttribute(email)
            res.status(200).json({
                status: "success",
                message: "Usuario encontrado exitosamente",
                data: user
            })
        } catch (error) {
            next(error)
        }
    }
    // Actualizar un usuario por completo o de manera parcial
    static async update(req, res, next) {
        try {
            const { email } = req.params
            const user = await UserService.update(email, req.body)
            res.status(200).json({
                status: "success",
                message: "Usuario actualizado exitosamente",
                data: user
            })
        } catch (error) {
            next(error)
        }
    }
    // Eliminar un usuario por el email
    static async deleteUser(req, res, next) {
        try {
            const { email } = req.params
            await UserService.deleteUser(email)
            res.status(200).json({
                status: "success",
                message: "Usuario eliminado exitosamente",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }
}