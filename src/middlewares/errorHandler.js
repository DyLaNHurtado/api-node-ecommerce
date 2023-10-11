class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map(({ properties }) => properties.message);
  const message = 'Validation error';
  return res.status(400).json({ error: message, errors });
};

const handleError = (err, res) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Something went wrong' });
};

module.exports = { CustomError, handleValidationError, handleError };