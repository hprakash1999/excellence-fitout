import { ZodError } from "zod";
import { ApiError } from "../utils/apiError.util.js";

export const validate = (schema) => (req, res, next) => {
  try {
    // parse & replace req.body with safe data
    console.log("Validating req.body:", req.body);
    req.body.isPublished = req.body.isPublished === "true";
    req.body = schema.parse(req.body);
    console.log("Validated req.body");
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const message = err.errors.map((e) => e.message).join(", ");
      return next(new ApiError(400, message));
    }
    next(err);
  }
};

