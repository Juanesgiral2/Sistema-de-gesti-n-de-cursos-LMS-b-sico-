// Importación de los módulos requeridos
import express from "express"
import authRouter from "./routes/auth.route.js"
import courseRouter from "./routes/course.route.js"
import enrollmentRouter from "./routes/enrollment.route.js"
import userRouter from "./routes/user.route.js"
import requestLogger from "./middlewares/requestLogger.js"
import errorHandler from "./middlewares/errorHandler.js"

// Declaración de la app
const app = express()

// Middlewares globales
app.use(express.json())
app.use(requestLogger)

// Rutas
app.use("/auth", authRouter)
app.use("/courses", courseRouter)
app.use("/enrollments", enrollmentRouter)
app.use("/users", userRouter)

// Middleware de manejo de errores (siempre al final)
app.use(errorHandler)

export default app