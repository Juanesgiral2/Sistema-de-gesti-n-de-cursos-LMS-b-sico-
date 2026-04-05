import Joi from "joi"

//Mensajes de error personalizados en español
const messages = {
    "string.base":         "{{#label}} debe ser texto.",
    "string.empty":        "{{#label}} no puede estar vacío.",
    "string.min":          "{{#label}} debe tener al menos {{#limit}} caracteres.",
    "string.max":          "{{#label}} no puede superar los {{#limit}} caracteres.",
    "string.guid":         "{{#label}} debe ser un UUID válido.",
    "any.required":        "{{#label}} es obligatorio.",
    "any.only":            "{{#label}} debe ser uno de: {{#valids}}.",
    "object.min":          "Debes enviar al menos un campo para actualizar.",
}
//Niveles permitidos
const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"]
//Esquema base
const courseBaseSchema = {
    title: Joi.string()
        .trim()
        .min(5)
        .max(120)
        .label("El título"),

    description: Joi.string()
        .trim()
        .min(20)
        .max(1000)
        .label("La descripción"),

    level: Joi.string()
        .valid(...LEVELS)
        .default("BEGINNER")
        .label("El nivel"),

    instructorId: Joi.string()
        .guid({ version: "uuidv4" })
        .label("El instructor"),
}
//Esquema para creación
const createCourseSchema = Joi.object({
    title:        courseBaseSchema.title.required(),
    description:  courseBaseSchema.description.required(),
    level:        courseBaseSchema.level.optional(),
    instructorId: courseBaseSchema.instructorId.required(),
}).options({ messages, stripUnknown: true })
//Esquema para actualización
const updateCourseSchema = Joi.object({
    title:        courseBaseSchema.title.optional(),
    description:  courseBaseSchema.description.optional(),
    level:        courseBaseSchema.level.optional(),
    instructorId: courseBaseSchema.instructorId.optional(),
}).min(1).options({ messages, stripUnknown: true })
//Exportación de los esquemas
export{createCourseSchema,updateCourseSchema}