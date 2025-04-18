// Swagger configuration for API documentation using swagger-jsdoc and swagger-ui-express.
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Import YAML parser
const authDocs = YAML.load('./src/docs/auth.yaml');
const cacheDocs = YAML.load('./src/docs/cache.yaml');
const checklistDocs = YAML.load('./src/docs/checklist.yaml');
const documentDocs = YAML.load('./src/docs/document.yaml');
const eventDocs = YAML.load('./src/docs/event.yaml');
const financeDocs = YAML.load('./src/docs/finance.yaml');
const orderEventDocs = YAML.load('./src/docs/orderEvent.yaml');
const orderTicketDocs = YAML.load('./src/docs/orderTicket.yaml');
const organizationDocs = YAML.load('./src/docs/organization.yaml');
const ticketDocs = YAML.load('./src/docs/ticket.yaml');
const userDocs = YAML.load('./src/docs/user.yaml');
const venueDocs = YAML.load('./src/docs/venue.yaml');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Organizer API",
      version: "1.0.0",
      description: "Event Organizer API with Swagger",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      ...authDocs.components,
      ...cacheDocs.components,
      ...checklistDocs.components,
      ...documentDocs.components,
      ...eventDocs.components,
      ...financeDocs.components,
      ...orderEventDocs.components,
      ...orderTicketDocs.components,
      ...organizationDocs.components,
      ...ticketDocs.components,
      ...userDocs.components,
      ...venueDocs.components,
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000", // Base server URL
      },
    ],
    paths: {
      ...authDocs.paths,
      ...cacheDocs.paths,
      ...checklistDocs.paths,
      ...documentDocs.paths,
      ...eventDocs.paths,
      ...financeDocs.paths,
      ...orderEventDocs.paths,
      ...orderTicketDocs.paths,
      ...organizationDocs.paths,
      ...ticketDocs.paths,
      ...userDocs.paths,
      ...venueDocs.paths,
    },
  },
  apis: ["./src/routes/*.js"], // Path to files containing Swagger JSDoc documentation
};

// Generate Swagger specifications based on the options above.
const specs = swaggerJsDoc(options);

// Export swaggerUi and specs objects for use in Express.
module.exports = { swaggerUi, specs };
