require('dotenv').config();
const express = require("express");
const cors = require('cors');
const {dbConnectMySQL} = require("./config/config.js");
const { swaggerUi, swaggerDocs } = require('./swagger');
const User = require('./models/User.js');
const {encrypt} = require('./utils/handlePassword.js');
const path = require('path');
const app = express();
const {Team, TeamMember, Vista, Footer} = require('./models/associations.js');
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.use('/public', express.static(path.join(__dirname, 'public')));

const CSS_URL = "/public/swagger-ui.css"; 

app.use('/api', require('./routes'));

app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  }));
  
app.listen(port, () => {
    console.log(`Funcionando en: ${port}`);
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no Encontrada'
    })
});

dbConnectMySQL();

// Función para crear el administrador por defecto
const createDefaultAdmin = async () => {
    try {
        const adminEmail = "admin@admin.com"; // Email del administrador por defecto
        const adminPassword = "adminRST"; // Contraseña del administrador por defecto

        // Verifica si el administrador ya existe
        const existingAdmin = await User.findOne({ where: { email: adminEmail, role: 'admin' } });

        if (!existingAdmin) {
            // Si no existe, crea el administrador
            const passwordHash = await encrypt(adminPassword);
            await User.create({
                name: 'Admin',
                email: adminEmail,
                password: passwordHash,
                role: 'admin',
            });
            console.log('Administrador por defecto creado');
        } else {
            console.log('El administrador ya existe');
        }
    } catch (error) {
        console.error('Error al crear el administrador por defecto:', error);
    }
};

// Llama a la función para crear el administrador por defecto
createDefaultAdmin();

