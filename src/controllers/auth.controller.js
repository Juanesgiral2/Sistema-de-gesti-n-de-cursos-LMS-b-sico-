//Importación de los módulos requeridos
import AuthService from "../services/auth.service.js"
import logger from "../config/logger.js"

//Declaración y exportación de la clase AuthController
export default class AuthController {
    //Métodos
    //Registrar un usuario
    static async registerUser(req, res, next) {
        try {
            const newUser = await AuthService.register(req.body)

            logger.info("Usuario registrado exitosamente", {
                email: req.body?.email,
                method: req.method,
                path: req.path
            })

            res.status(201).json({ message: "Usuario registrado", user: newUser })
        } catch(error) {
            // 409 - El usuario ya existe (AppError lanzado en register)
            if(error.status === 409){
                logger.warn("Intento de registro con email ya existente", {
                    email: req.body?.email,
                    method: req.method,
                    path: req.path
                })
            } else {
                logger.error("Error inesperado al registrar usuario", {
                    email: req.body?.email,
                    method: req.method,
                    path: req.path,
                    error: error.message
                })
            }
            next(error)
        }
    }
    //Loggear un usuario
    static async login(req, res, next) {
        try {
            const { token, user } = await AuthService.login(req.body)

            logger.info("Inicio de sesión exitoso", {
                userId: user.id,
                role: user.role,
                method: req.method,
                path: req.path
            })

            res.json({ token })
        } catch(error) {
            // 404 - Email no encontrado (AppError lanzado en login)
            if(error.status === 404){
                logger.warn("Intento de login con email no registrado", {
                    email: req.body?.email,
                    method: req.method,
                    path: req.path
                })
            // 401 - Contraseña inválida (AppError lanzado en login)
            } else if(error.status === 401){
                logger.warn("Intento de login con contraseña incorrecta", {
                    email: req.body?.email,
                    method: req.method,
                    path: req.path
                })
            } else {
                logger.error("Error inesperado en login", {
                    email: req.body?.email,
                    method: req.method,
                    path: req.path,
                    error: error.message
                })
            }
            next(error)
        }
    }
}