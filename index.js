const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Creando el server de express
const app = express();

// Inicialización DB
dbConnection();

// Acceso al directorio publico
app.use(express.static('public'));

// Parsear body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
