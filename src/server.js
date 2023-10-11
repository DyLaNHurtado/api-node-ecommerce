const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const envConfig = require('../config/envConfig');
const setupDatabase = require('../scripts/setupDatabase');
const routes = require('./routes/routes');

const app = express();
const PORT = envConfig.server.port;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// MongoDB setup
setupDatabase();

// API routes
app.use(envConfig.api.uri, routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
