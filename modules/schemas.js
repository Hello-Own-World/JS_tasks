const Joi = require('joi');

const schemas = {
  bookPOST: Joi.object().keys({
    title: Joi.string().max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    genre: Joi.string().min(2).max(30).required(),
  }),
  bookDelGet: Joi.object().keys({
    title: Joi.string().max(30).required(),
    author: Joi.string().min(2).max(30).required(),
  }),
  bookPUT: Joi.object().keys({
    title: Joi.string().max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    genre: Joi.string().min(2).max(30).required(),
    new_title: Joi.string().max(30).allow(null, ''), // may be avoided in case no new value provided
    new_author: Joi.string().max(30).allow(null, ''),
  }),
  sendMsgPOST: Joi.object().keys({
    body: Joi.string().max(160).required(), // 160 traditional sms message
  }),
  sendMsgDELETE: Joi.object().keys({
    id: Joi.string().required(),
  }),
  sendMsgPUT: Joi.object().keys({
    id: Joi.string().required(),
    body: Joi.string().max(160).required(),
  }),
  userSignUpPOST: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
    pass: Joi.string().required(),
    firstName: Joi.string().required(), // better avoid validation
    lastName: Joi.string().required(), // better avoid validation
    phone: Joi.number().integer().positive().required(),
  }),
  UserSignInPOST: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
    pass: Joi.string().required(),
  }),
  UserGetDel: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
  }),
  userPUT: Joi.object().keys({
    login: Joi.string().email().lowercase().required(),
    pass: Joi.string(),
    firstName: Joi.string(), // better avoid validation
    lastName: Joi.string(), // better avoid validation
    phone: Joi.number().integer().positive(),
  }),
};

module.exports = schemas;
