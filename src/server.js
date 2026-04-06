// Importación de los módulos requeridos
import app from "./app.js"
import logger from "./config/logger.js"

// Puerto del servidor
const PORT = process.env.PORT || 3000

// Inicio del servidor
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`)
})