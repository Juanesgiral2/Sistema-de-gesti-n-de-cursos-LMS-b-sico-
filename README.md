# 📚 LMS — Learning Management System API
 
API REST para la gestión de un sistema de aprendizaje en línea. Permite administrar usuarios, cursos e inscripciones con autenticación basada en JWT y control de acceso por roles.
 
---
 
## 🚀 Tecnologías
 
| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | — | Entorno de ejecución |
| Express | ^5.2.1 | Framework HTTP |
| Prisma | ^7.6.0 | ORM / migraciones |
| PostgreSQL | — | Base de datos relacional |
| JWT (jsonwebtoken) | ^9.0.3 | Autenticación |
| bcrypt | ^6.0.0 | Hash de contraseñas |
| Joi | ^18.1.2 | Validación de datos |
| Winston | ^3.19.0 | Logging |
| uuid | ^13.0.0 | Generación de IDs |
| dotenv | ^17.3.1 | Variables de entorno |
 
---
 
## 📁 Estructura del Proyecto
 
```
LMS/
├── prisma/
│   ├── schema.prisma           # Modelos de la base de datos
│   └── migrations/             # Historial de migraciones SQL
├── src/
│   ├── app.js                  # Configuración de Express y rutas
│   ├── server.js               # Punto de entrada del servidor
│   ├── config/
│   │   ├── dataBase.js         # Conexión a PostgreSQL
│   │   └── logger.js           # Configuración de Winston
│   ├── controllers/            # Lógica de presentación (request/response)
│   │   ├── auth.controller.js
│   │   ├── course.controller.js
│   │   ├── enrollment.controller.js
│   │   └── user.controller.js
│   ├── services/               # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── course.service.js
│   │   ├── enrollment.service.js
│   │   └── user.service.js
│   ├── models/                 # Acceso a datos (Prisma)
│   │   ├── user.model.js
│   │   ├── course.model.js
│   │   └── enrollment.js
│   ├── routes/                 # Definición de endpoints
│   │   ├── auth.route.js
│   │   ├── course.route.js
│   │   ├── enrollment.route.js
│   │   └── user.route.js
│   ├── middlewares/
│   │   ├── auth.middleware.js  # Verificación JWT y control de roles
│   │   ├── errorHandler.js     # Manejador global de errores
│   │   ├── requestLogger.js    # Log de cada petición HTTP
│   │   └── validate.js         # Middleware de validación con Joi
│   ├── validators/             # Esquemas Joi
│   │   ├── user.validator.js
│   │   ├── course.validator.js
│   │   └── enrollment.validator.js
│   ├── utils/
│   │   ├── hash.js             # Utilidades para bcrypt
│   │   └── errorCustom.js      # Clase AppError personalizada
│   └── logs/                   # Archivos de log generados en runtime
├── .env                        # Variables de entorno (no subir a git)
├── .gitignore
├── package.json
└── prisma.config.ts
```
 
---
 
## 🗄️ Modelo de Datos
 
El sistema cuenta con tres entidades principales:
 
**User** — Usuarios del sistema con rol asignado (`ADMIN`, `INSTRUCTOR`, `ESTUDIANTE`).
 
**Course** — Cursos creados por instructores con niveles `BEGINNER`, `INTERMEDIATE` o `ADVANCED`.
 
**Enrollment** — Relación entre un usuario y un curso. Tiene restricción única por par `(userId, courseId)` para evitar inscripciones duplicadas.
 
```
User ──< Course       (un instructor puede tener muchos cursos)
User ──< Enrollment   (un estudiante puede tener muchas inscripciones)
Course ──< Enrollment (un curso puede tener muchas inscripciones)
```
 
---
 
## ⚙️ Instalación y Configuración
 
### 1. Clonar el repositorio
 
```bash
git clone https://github.com/tu-usuario/lms.git
cd lms
```
 
### 2. Instalar dependencias
 
```bash
npm install
```
 
### 3. Configurar variables de entorno
 
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
 
```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/LMS?schema=public"
JWTSECRET="tu_secreto_jwt_seguro"
NODE_ENV="development"
```
 
> ⚠️ **Importante:** Nunca subas el archivo `.env` al repositorio. Ya está incluido en `.gitignore`.
 
### 4. Ejecutar las migraciones
 
```bash
npx prisma migrate deploy
```
 
O en desarrollo:
 
```bash
npx prisma migrate dev
```
 
### 5. Iniciar el servidor
 
```bash
npm start
```
 
El servidor correrá por defecto en `http://localhost:3000`.
 
---
 
## 🔐 Autenticación
 
La API usa **JWT (JSON Web Tokens)**. Tras iniciar sesión, el token debe enviarse en el header de cada petición protegida:
 
```
Authorization: Bearer <token>
```
 
Los tokens tienen una validez de **1 hora**.
 
---
 
## 👥 Roles y Permisos
 
| Rol | Descripción |
|---|---|
| `ADMIN` | Acceso total: gestión de usuarios, cursos e inscripciones |
| `INSTRUCTOR` | Puede crear cursos y consultar usuarios |
| `ESTUDIANTE` | Puede inscribirse en cursos y ver sus inscripciones |
 
---
 
## 📡 Endpoints
 
### Auth — `/auth`
 
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/auth/register` | Registrar un nuevo usuario | Público |
| `POST` | `/auth/login` | Iniciar sesión y obtener token JWT | Público |
 
**Body de registro:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "contraseña123",
  "role": "ESTUDIANTE"
}
```
 
**Body de login:**
```json
{
  "email": "juan@email.com",
  "password": "contraseña123"
}
```
 
---
 
### Usuarios — `/users`
 
| Método | Ruta | Descripción | Roles permitidos |
|---|---|---|---|
| `GET` | `/users` | Obtener todos los usuarios | `ADMIN` |
| `GET` | `/users/:email` | Buscar usuario por email | `ADMIN`, `INSTRUCTOR` |
| `PATCH` | `/users/:email` | Actualizar datos de un usuario | `ADMIN` |
| `DELETE` | `/users/:email` | Eliminar un usuario | `ADMIN` |
 
---
 
### Cursos — `/courses`
 
| Método | Ruta | Descripción | Roles permitidos |
|---|---|---|---|
| `POST` | `/courses` | Crear un nuevo curso | `ADMIN`, `INSTRUCTOR` |
| `GET` | `/courses` | Listar todos los cursos (soporta filtros por query) | Público |
| `GET` | `/courses/:id` | Obtener un curso por ID | Público |
| `PATCH` | `/courses/:id` | Actualizar un curso | `ADMIN` |
| `DELETE` | `/courses/:id` | Eliminar un curso | `ADMIN` |
 
**Filtros disponibles en `GET /courses`:**
 
```
GET /courses?level=BEGINNER
GET /courses?title=JavaScript
GET /courses?instructorId=abc123
```
 
**Body para crear/actualizar curso:**
```json
{
  "title": "Node.js desde cero",
  "description": "Aprende Node.js de forma práctica",
  "level": "BEGINNER",
  "instructorId": "uuid-del-instructor"
}
```
 
---
 
### Inscripciones — `/enrollments`
 
| Método | Ruta | Descripción | Roles permitidos |
|---|---|---|---|
| `POST` | `/enrollments` | Inscribirse en un curso | `ESTUDIANTE` |
| `GET` | `/enrollments/my-courses` | Ver mis inscripciones | Todos los autenticados |
| `DELETE` | `/enrollments/:id` | Eliminar una inscripción | `ADMIN`, `ESTUDIANTE` (solo las propias) |
 
**Body para inscribirse:**
```json
{
  "courseId": "uuid-del-curso"
}
```
 
> El `userId` se toma automáticamente del token JWT, no del body.
 
---
 
## 📝 Logging
 
El sistema registra eventos en archivos dentro de `src/logs/`:
 
| Archivo | Contenido |
|---|---|
| `access.log` | Todas las peticiones HTTP entrantes |
| `combined.log` | Logs generales de la aplicación |
| `error.log` | Errores del sistema |
| `security.log` | Eventos de seguridad (tokens inválidos, accesos denegados) |
 
---
 
## 🛡️ Manejo de Errores
 
Todos los errores son manejados por un middleware centralizado. Las respuestas de error siguen este formato:
 
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```
 
Los códigos HTTP más comunes utilizados son:
 
- `400` — Datos de entrada inválidos
- `401` — No autenticado / token inválido o expirado
- `403` — Sin permisos suficientes
- `404` — Recurso no encontrado
- `409` — Conflicto (ej. email ya registrado, inscripción duplicada)
- `500` — Error interno del servidor
