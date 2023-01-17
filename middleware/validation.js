const Joi = require('joi')

const validate = (schema, property) => { 
    return (req, res, next) => { 
    const { error, value } = schema.validate(req.body) 

    const valid = error == null; 
    
    if (valid) { 
        console.log(valid)
        req.body = value
        next();
    } else { 
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
    
        res.status(404).json({ error: message }) } 
    } 
  } 
  module.exports = validate;