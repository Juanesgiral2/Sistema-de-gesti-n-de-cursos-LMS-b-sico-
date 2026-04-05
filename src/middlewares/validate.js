//Importación de los módulos requeridos
import AppError from "../utils/errorCustom.js"
//Declaración y exportación del middleware que gestiona las validaciones
export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            const message = error.details
                .map(err => err.message)
                .join(", ")

            return next(new AppError(message, 400))
        }

        req.body = value

        next()
    }
}