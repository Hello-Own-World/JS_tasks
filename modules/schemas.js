const Joi = require('joi')


const schemas = {

  bookPOST: Joi.object().keys({
    name: Joi.string().max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    genre: Joi.string().min(2).max(30).required()
  }),
  sendMsgPOST: Joi.object().keys({
    body: Joi.string().max(160).required() // 160 traditional sms message
  }),
  userSignUpPOST: Joi.object().keys({
    login: Joi.string().email().required(),
    pass: Joi.string().required(),
    firstName: Joi.string().required(), //better avoid validation
    lastName: Joi.string().required(),  //better avoid validation
    phone: Joi.number().integer().positive().required()
  }),
  UserSignInPOST: Joi.object().keys({
    login: Joi.string().email().required(),
    pass: Joi.string().required()
  })


};


module.exports = schemas;