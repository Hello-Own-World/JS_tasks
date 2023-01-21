const createError = require('http-errors');

const validate = (schema, reqPart) => (req, res, next) => {
  const { error, value } = schema.validate(req[reqPart]);

  const valid = error == null;

  if (valid) {
    req[reqPart] = value;
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    next(createError(500, message));
  }
};

module.exports = validate;
