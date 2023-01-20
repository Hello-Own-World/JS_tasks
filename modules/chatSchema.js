const Joi = require('joi');

const schemas = {
  msgBodyPost: Joi.object().keys({
    body: Joi.string().max(160).required(), // 160 traditional sms message
  }),
  msgBodyDel: Joi.object().keys({
    id: Joi.string().required(),
  }),
  msgBodyPut: Joi.object().keys({
    id: Joi.string().required(),
    body: Joi.string().max(160).required(),
  }),
};

module.exports = schemas;
