const createError = require('http-errors');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params);

  const valid = error == null;

  if (valid) {
    req.params = value;
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    next(createError(500, message));
  }
};

module.exports = validate;
