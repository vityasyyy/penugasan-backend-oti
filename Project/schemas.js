const Joi = require('joi');
const dateRegex = /^(?:0[1-9]|[1-2][0-9]|3[01])-(?:0[1-9]|1[0-2])-\d{4}$/;

module.exports.eventSchema = Joi.object({
    events: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.string().pattern(dateRegex).message("Date must follow the DD-MM-YYYY format").required()
    }).required()
})

module.exports.registSchema = Joi.object({
    regist: Joi.object({
        body: Joi.string().pattern(/^join$/).message(`Type "join" and nothing else`).required()
    }).required()
})

