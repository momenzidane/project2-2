const Joi = require('@hapi/joi');

// const schema = Joi.object({
//     name : Joi.string().required(),
//     email : Joi.string().email().message('"email" must be a valid email  =>  Like this : aaa@gmail.com').required(),
//     username : Joi.string().alphanum().min(4).max(10) .required(),
//     password : Joi.string().
//     pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')).message('password with value fails to match the required pattern [upercase & lowercase & length must be at least 9 characters long]').required()
// })

// module.exports = schema;

// //^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$
// //^[a-zA-Z0-9!@#$%^&*]{6,16}$



// validation/user.js
// const Joi = require('joi');  // تأكد من استخدام الإصدار الصحيح من Joi

const schema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': '"name" cannot be empty',
        'any.required': '"name" is required'
    }),
    email: Joi.string().email().message('"email" must be a valid email (e.g., aaa@gmail.com)').required().messages({
        'string.empty': '"email" cannot be empty',
        'any.required': '"email" is required'
    }),
    username: Joi.string().alphanum().min(4).max(10).required().messages({
        'string.empty': '"username" cannot be empty',
        'string.alphanum': '"username" must contain only letters and numbers',
        'string.min': '"username" must be at least 4 characters long',
        'string.max': '"username" must not exceed 10 characters',
        'any.required': '"username" is required'
    }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$'))
        .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.')
        .required()
        .messages({
            'string.empty': '"password" cannot be empty',
            'any.required': '"password" is required'
        })
});

module.exports = schema;
