const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./src/middlewares/errorHandler');
const envConfig = require('./config/envConfig');
const setupDatabase = require('./scripts/setupDatabase');
const routes = require('./routes');

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
app.use('/api', routes);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
