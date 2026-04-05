//Importación de los módulos requeridos
import Joi from "joi"
//Mensajes de error personalizados en español
const messages = {
    "string.base":         "{{#label}} debe ser texto.",
    "string.empty":        "{{#label}} no puede estar vacío.",
    "string.min":          "{{#label}} debe tener al menos {{#limit}} caracteres.",
    "string.max":          "{{#label}} no puede superar los {{#limit}} caracteres.",
    "string.email":        "{{#label}} debe ser un correo electrónico válido.",
    "string.pattern.base": "{{#label}} no cumple el formato requerido.",
    "any.required":        "{{#label}} es obligatorio.",
    "any.only":            "{{#label}} debe ser uno de: {{#valids}}.",
    "object.min":          "Debes enviar al menos un campo para actualizar.",
}
//Regex para la contraseña
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/
//Posible roles para el usuario
const ROLES = ["ADMIN", "INSTRUCTOR", "ESTUDIANTE"]
//Esquema base
const userBaseSchema = {
    name: Joi.string()
        .trim()
        .min(3)
        .max(80)
        .label("El nombre"),

    email: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } })
        .max(150)
        .label("El correo electrónico"),

    password: Joi.string()
        .min(8)
        .max(50)
        .pattern(PASSWORD_PATTERN)
        .label("La contraseña"),

    role: Joi.string()
        .valid(...ROLES)
        .default("ESTUDIANTE")
        .label("El rol"),
}
//Esquema para la creacion
const createUserSchema = Joi.object({
    name:     userBaseSchema.name.required(),
    email:    userBaseSchema.email.required(),
    password: userBaseSchema.password.required(),
    role:     userBaseSchema.role.optional(),
}).options({ messages, stripUnknown: true })
//Esquema para la actualización
const updateUserSchema = Joi.object({
    name:     userBaseSchema.name.optional(),
    email:    userBaseSchema.email.optional(),
    password: userBaseSchema.password.optional(),
    role:     userBaseSchema.role.optional(),
}).min(1).options({ messages, stripUnknown: true })
//Exportación de los esquemas
export{createUserSchema,updateUserSchema}