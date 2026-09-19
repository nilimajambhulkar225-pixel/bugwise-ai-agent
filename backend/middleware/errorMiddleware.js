function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "The request could not be completed." : error.message;

  console.error(`${req.method} ${req.originalUrl}:`, error.message);
  res.status(statusCode).json({ success: false, message });
}

module.exports = errorMiddleware;
