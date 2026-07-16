import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError = error.flatten();
      return res.status(400).json(formattedError);
    }

    res.status(400).send(error);
  }
};

export default validate;
