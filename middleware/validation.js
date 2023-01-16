const Joi = require('joi')

const validate = (schema, property) => { 
    return (req, res, next) => { 
    const { error } = schema.validate(req.body) 
    console.log(error)
    const valid = error == null; 
    
    if (valid) { 
        console.log(valid)
        next();
    } else { 
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
    
        console.log("error", message); 
        res.status(404).json({ error: message }) } 
    } 
  } 
  module.exports = validate;