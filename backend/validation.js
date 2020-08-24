const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        age: Joi.number().min(0).max(120).required(),
        sex: Joi.string().min(4).max(10).required(),
        job: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        password_check: Joi.string().required()
    });

    return schema.validate(data);
}

const updateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        last_name: Joi.string().min(3),
        age: Joi.number().min(0).max(120),
        sex: Joi.string().min(4).max(10),
        job: Joi.string().min(4).max(255),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6),
        password_check: Joi.string()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(1).required().email(),
        password: Joi.string().min(1).required(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.updateValidation = updateValidation;
module.exports.loginValidation = loginValidation;