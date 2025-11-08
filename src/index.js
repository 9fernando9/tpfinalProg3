import express from 'express';
import routes from './routes/indexRuta.js';
// Swagger imports
import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';

// Importaciones para Morgan y Módulos Internos (ESM)
import morgan from 'morgan';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Definición de __dirname (Necesario en Módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Configuración del Stream para el ARCHIVO
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

const app = express();


// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// 🚀 APLICACIÓN DE MORGAN:

// 2. Registro a la CONSOLA (stdout)
// Usamos el formato 'dev' que es colorido y conciso para desarrollo.
// Morgan usa 'process.stdout' por defecto si no se especifica 'stream'.
app.use(morgan('dev')); 

// 3. Registro al ARCHIVO (access.log)
// Usamos el formato 'combined' que es detallado y estándar para archivos de log.
app.use(morgan('combined', { stream: accessLogStream })); 

//Middleware to parse JSON bodies
app.use(express.json());
// ROUTES
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});