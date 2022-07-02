const { NODE_ENV } = process.env;

/**
 * @desc    Handling error 404
 * @route   All routes that don't exist
 * @access  Public
 */
const get404Error = (req, res, next) => {
  res.status(404).json({ message: "Error Not found." });
};

/**
 * @desc    Handling system error
 * @route   All routes
 * @access  Public
 */
const getSystemError = (error, req, res, next) => {
  const errors = {
    message: error?.message,
    validations: error?.validations,
    stack: error?.stack,
  };
  const status = error.statusCode || 500;
  if (status !== 422) errors.validations = null;
  if (NODE_ENV === "production") errors.stack = null;
  res.status(status).json(errors);
};

export { get404Error, getSystemError };
export default { get404Error, getSystemError };
