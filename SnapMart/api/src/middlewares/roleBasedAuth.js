const roleBasedAuth = (...roles) => (req, res, next) => {
  if (req.user?.roles?.some((role) => roles.includes(role))) return next();

  res.status(403).send("Access denied.");
};

export default roleBasedAuth;
