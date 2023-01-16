const Joi = require('joi')


const schemas = {

  bookPOST: Joi.object().keys({
    name: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required()
  }),
  sendMsgPOST: Joi.object().keys({
    body: Joi.string().required()
  }),
  userSignUpPOST: Joi.object().keys({
    login: Joi.string().required(),
    pass: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required()
  }),
  UserSignInPOST: Joi.object().keys({
    login: Joi.string().required(),
    pass: Joi.string().required()
  })


};


module.exports = schemas;