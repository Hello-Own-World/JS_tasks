const jwt = require("jsonwebtoken");

const {TOKEN_KEY} = process.env;

const verifyToken = (req, res, next) => {
//   const token = req.body.token || req.query.token || req.headers["x-access-token"]
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(403).send("A token is required for authentication");
    
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    console.log(decoded)
    req.user = decoded;
    console.log(req.user)
  } catch (err) {   
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;