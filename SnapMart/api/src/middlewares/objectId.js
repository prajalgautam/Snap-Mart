import mongoose from "mongoose";

const validateObjectId = (param = "id") => (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params[param])) {
    return res.status(400).json({ message: `Invalid ${param}.` });
  }
  next();
};

export default validateObjectId;
