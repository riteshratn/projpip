const Joi = require("joi");

const joiUserSchema = Joi.object({
  email: Joi.string().min(3).required().email(),
  password: Joi.string().alphanum().min(5).required(),
});

const validateUser = () => {
    return (req, res, next) => {
        const { error } = joiUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = { joiUserSchema, validateUser };
