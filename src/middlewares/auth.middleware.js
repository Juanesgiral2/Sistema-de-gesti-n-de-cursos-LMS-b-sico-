//Importación de los módulos requeridos
import jwt from "jsonwebtoken"
import AppError from "../utils/errorCustom.js"
import logger from "../config/logger.js"

//Declaración de la función para verificar el token
function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            logger.warn("Intento de acceso sin token", {
                ip: req.ip,
                method: req.method,
                url: req.originalUrl
            })
            throw new AppError("Token requerido", 401)
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded

        logger.info("Token verificado correctamente", {
            userId: decoded.id,
            role: decoded.role,
            method: req.method,
            url: req.originalUrl
        })

        return next()
    } catch (error) {
        // Errores propios de JWT
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            logger.warn("Token inválido o expirado", {
                errorName: error.name,
                method: req.method,
                url: req.originalUrl
            })
            return next(new AppError("Token inválido o expirado", 401))
        }

        next(error)
    }
}

//Declaración de la función para validar por roles
function hasRole(...roles) {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                logger.warn("Acceso denegado por rol insuficiente", {
                    userId: req.user.id,
                    userRole: req.user.role,
                    requiredRoles: roles,
                    method: req.method,
                    url: req.originalUrl
                })
                throw new AppError("No autorizado", 403)
            }

            logger.info("Acceso autorizado por rol", {
                userId: req.user.id,
                role: req.user.role,
                method: req.method,
                url: req.originalUrl
            })

            next()
        } catch (error) {
            next(error)
        }
    }
}

//Exportación de las funciones
export { verifyToken, hasRole }