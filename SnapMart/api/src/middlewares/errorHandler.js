const errorHandler = (error, req, res, next) => {
  const status = error.status || (error.name === "ValidationError" ? 400 : 500);
  if (status >= 500) console.error("Unhandled request error", { method: req.method, path: req.originalUrl, error });
  res.status(status).json({ message: status >= 500 ? "Internal server error." : error.message || "Request failed." });
};

export default errorHandler;
