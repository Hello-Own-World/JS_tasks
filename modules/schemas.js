const Joi = require('joi') 


const schemas = { 

  bookPOST: Joi.object().keys({ 
    name: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required()
  }) 

}; 


module.exports = schemas;