const sendError = (message, status, validations = null) => {
  const error = new Error(message);
  error.statusCode = status;
  error.validations = validations;
  throw error;
};

export default sendError;
