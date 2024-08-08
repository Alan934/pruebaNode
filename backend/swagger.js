const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation ',
            contact: {
                name: 'Developer',
                email: 'developer@example.com'
            },
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
        servers: [
            {
                url: 'https://backend-rts-institucional.vercel.app/',
                description: 'Development server'
            },
            {
                url: 'https://backend-rts-institucional.onrender.com/',
                description: 'Development server'
            },
            {
                url: 'http://localhost:3001/',
                description: 'Development local'
            }
        ]
    },
    apis: ['./routes/*.js', './docs/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs }