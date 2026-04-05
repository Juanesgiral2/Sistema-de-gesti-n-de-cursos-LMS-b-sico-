//Importación de los módulos requeridos
import logger from "../config/logger.js"
//Declaración del middleware que gestiona los requests en los middlewares de ruta
const requestLogger = (req,res,next) => {
    const start = Date.now()

    //Captura la hora en que se termina de enviar la respuesta
    res.on("finish",()=>{
        const duration = Date.now() - start
        const {method,originalUrl} = req
        const {statusCode} = res

        //Declaración de la metadata que se le pasará al log
        const logData = {
            method,
            url:originalUrl,
            duration:`${duration}ms`,
            status:statusCode
        }

        //Nivel de log según el status code
        if(statusCode >= 500){
            logger.error("Server error", logData)
        }else if(statusCode >= 400){
            logger.warn("Client error",logData)
        }else{
            logger.info("Request completed", logData)
        }
    })

    next()
}

export default requestLogger