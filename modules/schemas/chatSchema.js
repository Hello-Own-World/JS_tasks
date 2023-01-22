const Joi = require('joi');

const schemas = {
  msgBodyPostPut: Joi.object().keys({
    body: Joi.string().max(160).required(),
  }),
  msgParamDelPut: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = schemas;
