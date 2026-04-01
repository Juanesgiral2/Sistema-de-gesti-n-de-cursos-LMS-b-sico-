//Importación de los módulos necesarios
import bcrypt from "bcrypt"
//Declaración de la función responsable de generar el hash
async function hashPassword(password) {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}
//Declaración de la función responsable de realizar la comparación
async function compare(password,hash){
    const match = await bcrypt.compare(password,hash)

    return match
}
//Exportación de la función
export {hashPassword,compare}