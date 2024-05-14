const { User } = require("../db/index");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({});
}
  const token=authHeader.split(" ")[1];

  try {
    const userData=jwt.verify(token, JWT_SECRET);
    req.userId = userData.userId;
    if(userData){
      next();
    }
  }
  catch (error) {
    res.send("Invalid Token")
  }
}

module.exports = userMiddleware;