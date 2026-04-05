//Importación de los módulos requeridos
import Joi from "joi"
//Mensajes de error personalizados en español
const messages = {
    "string.base":  "{{#label}} debe ser texto.",
    "string.empty": "{{#label}} no puede estar vacío.",
    "string.guid":  "{{#label}} debe ser un UUID válido.",
    "any.required": "{{#label}} es obligatorio.",
}
//Esquema para creación
export default createEnrollmentSchema = Joi.object({
    studentId: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .label("El estudiante"),

    courseId: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .label("El curso"),

}).options({ messages, stripUnknown: true })