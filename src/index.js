import express from "express";
import 'dotenv/config';
import cors from 'cors';
import { dbConnection } from "./config/db.js";
import routesUsuarios from '../src/routes/usuarios.routes.js';
import loginRoutes from '../src/routes/auth.routes.js';
import hospitalesRoutes from '../src/routes/hospitales.routes.js';
import medicosRoutes from '../src/routes/medico.routes.js';
import busquedasRoutes from '../src/routes/busquedas.routes.js';
import uploadsRoutes from '../src/routes/uploads.routes.js';

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

const port = process.env.PORT || 4000;

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/usuarios', routesUsuarios);
app.use('/api/login', loginRoutes);
app.use('/api/hospitales', hospitalesRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/todo', busquedasRoutes);
app.use('/api/upload', uploadsRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})