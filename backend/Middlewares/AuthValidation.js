const Joi = require('joi');

// Signup Validation
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/) // Matches a 10-digit phone number
      .required(),
    gender: Joi.string().valid("male", "female", "other").optional() // Gender must be one of these values
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }
  next();
};

// Login Validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};