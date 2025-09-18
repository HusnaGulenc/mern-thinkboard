import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN STACK API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5001", // backend url
      },
    ],
  },
  apis: ["./routes/*.js"], // API endpoint folder
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
