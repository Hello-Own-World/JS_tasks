const Joi = require('joi');

const schemas = {
  bodyPost: Joi.object().keys({
    title: Joi.string().max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    genre: Joi.string().min(2).max(30).required(),
  }),
  bodyPut: Joi.object().keys({
    title: Joi.string().max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    genre: Joi.string().min(2).max(30).required(),
    new_title: Joi.string().max(30).allow(null, ''), // may be avoided in case no new value provided
    new_author: Joi.string().max(30).allow(null, ''), // may be avoided in case no new value provided
  }),
};

module.exports = schemas;
