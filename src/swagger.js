const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "화평교회 Service withg Swagger",
            version: "1.0.0",
            description: "a Rest api using swagger and express.",
            contact: {
                name: "Clever Lee",
                email: "dlchdaud1327@gmail.com"
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            },
            {
                url: "http://3.35.17.147",
                description: "Production server"
            }
        ],
        components: {
            securitySchemes: {
              jwt: {
                type: "apiKey",
                scheme: "bearer",
                name: 'authorization',
                in: "header",
                bearerFormat: "JWT"
            },
          }
        },
        security: [{
          jwt: []
        }],
        basePath: "/v1",
        schemes: ["http"]
        
    },
    

    apis: ['app.js',
        'services/lesson/controllers/*',
        'services/lesson/admin/*',
        'services/user/controllers/*',
        'services/user/admin/*',
        'services/passport/controllers/*',
        'services/passport/admin/*',
        'services/manager/controllers/*',
        'services/manager/admin/*'
    ],
};

// https://editor.swagger.io/#!/

module.exports = options;