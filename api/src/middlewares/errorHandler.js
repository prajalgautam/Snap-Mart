const notFound = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);

  const status = error.status || error.statusCode || 500;
  const message =
    status >= 500 ? "An unexpected server error occurred." : error.message;

  res.status(status).json({ message });
};

export { errorHandler, notFound };
