const hasUnsafeKey = (value) => {
  if (!value || typeof value !== "object") return false;
  return Object.entries(value).some(([key, child]) =>
    key.startsWith("$") || key.includes(".") || hasUnsafeKey(child),
  );
};

const preventNoSqlInjection = (req, res, next) => {
  if (hasUnsafeKey(req.body) || hasUnsafeKey(req.query) || hasUnsafeKey(req.params)) {
    return res.status(400).json({ message: "Invalid request input." });
  }
  next();
};

export default preventNoSqlInjection;
