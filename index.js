const express = require('express');
require('dotenv').config();

// Creando el server de express
const app = express();

// Acceso al directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
