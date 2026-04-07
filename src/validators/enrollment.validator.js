//Importación de los módulos requeridos
import Joi from "joi"
//Mensajes de error personalizados en español
const messages = {
    "string.base":  "{{#label}} debe ser texto.",
    "string.empty": "{{#label}} no puede estar vacío.",
    "string.guid":  "{{#label}} debe ser un UUID válido.",
    "any.required": "{{#label}} es obligatorio.",
}
// También ajustado: solo se valida courseId (studentId se toma del token).
const createEnrollmentSchema = Joi.object({
    courseId: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .label("El curso"),

}).options({ messages, stripUnknown: true })

export default createEnrollmentSchema