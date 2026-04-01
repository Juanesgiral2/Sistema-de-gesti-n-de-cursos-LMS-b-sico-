//Importación de los módulos necesarios para instanciar el prisma client
import "dotenv/config"
import {PrismaPg} from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
//Declaración variable que almacena el string de conexión a la base de datos
const connectionString = `${process.env.DATABASE_URL}`
//Instanciación del adaptador
const adapter = new PrismaPg({connectionString})
//Instancición del prisma client
const db = new PrismaClient({adapter})
//Exportación de la instancia del prisma client
export {db}