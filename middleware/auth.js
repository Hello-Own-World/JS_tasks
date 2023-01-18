const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
 
    const {user_id} = jwt.verify(token, TOKEN_KEY);
    req.user = await User.findById(user_id);
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;