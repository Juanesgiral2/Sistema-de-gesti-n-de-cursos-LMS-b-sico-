//Declaración del middleware que maneja los errores globales
export default errorHandler = (err, req, res, next) => {
    //Error personalizado
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status: "error",
            message:err.message
        })
    }

    //Error no controlado
    return res.status(500).json({
        status:"error",
        message:"Error interno del servidor"
    })
}