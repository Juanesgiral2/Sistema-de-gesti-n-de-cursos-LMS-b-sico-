//Importación de los módulos requeridos
import winston, { format, transports } from "winston"
import path from "path"
//Declaración de la ruta de los archivos que contienen los respectivos logs
const dirPath = path.join("D:\\","Programming","LMS","src","logs")
//Declaración del formato base para el logger
const baseLogger = format.combine(
    format.timestamp(),
    format.metadata(),
    format.errors({stack:true}),
    format.printf(({level,timestamp,metadata,stack,message})=>{
        const meta = Object.keys(metadata).length ? JSON.stringify(metadata) : ""
        const errorStack = stack ?? message

        return `${timestamp} [${level}] ${meta} ${errorStack}`
    })
)

//Declaración del logger
const logger = winston.createLogger({
    level:"info",
    transports:[
        new transports.File({
            level:"error",
            filename:path.join(dirPath,"error.log"),
            format:baseLogger
        }),
        new transports.File({
            level:"warn",
            filename:path.join(dirPath,"security.log"),
            format:baseLogger
        }),
        new transports.File({
            filename:path.join(dirPath,"access.log"),
            format:baseLogger
        }),
        new transports.File({
            filename:path.join(dirPath,"combined.log"),
            format:baseLogger
        })
    ]
})
//
if(process.env.NODE_ENV !== "production"){
    logger.add(
        new transports.Console({
            format:format.simple()
        })
    )
}
//Exportación del logger