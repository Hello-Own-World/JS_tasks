const Joi = require('joi');

const schemas = {
  regBodyPost: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
    pass: Joi.string().required(),
    firstName: Joi.string().required(), // better avoid validation
    lastName: Joi.string().required(), // better avoid validation
    phone: Joi.number().integer().positive().required(),
  }),
  logBodyPost: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
    pass: Joi.string().required(),
  }),
  bodyDel: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
  }),
  bodyPut: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
    pass: Joi.string(),
    firstName: Joi.string(), // better avoid validation
    lastName: Joi.string(), // better avoid validation
    phone: Joi.number().integer().positive(),
  }),
};

module.exports = schemas;
