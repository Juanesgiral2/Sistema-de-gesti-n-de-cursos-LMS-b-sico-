//Importación de los módulos requeridos
import UserService from "./user.service.js"
import jwt from "jsonwebtoken"
import {compare} from "../utils/hash.js"
import AppError from "../utils/errorCustom.js"

//Declaración y exportación de la clase AuthService
export default class AuthService{
    //Métodos
    //Registrar un usuario
    static async register (data){
        const {email} = data

        const found = await UserService.findByEmail(email)

        if(found){
            throw new AppError("El usuario ya existe", 409)
        }

        return await UserService.createUser(data)
    }
    //Login
    static async login({email, password}){
        const userFound = await UserService.findByEmail(email)

        if(!userFound){
            throw new AppError("El email es incorrecto", 404) 
        }

        //Verificar que las contraseñas coincidan
        const valid = await compare(password, userFound.password)

        if(!valid) {
            throw new AppError("Contraseña invalida", 401)
        }

        //Generar el token
        const token = jwt.sign(
            {id: userFound.id, role: userFound.role},
            process.env.JWTSECRET,
            {expiresIn: "1h"}
        )

        return { token, user: { id: userFound.id, role: userFound.role } }
    }
}