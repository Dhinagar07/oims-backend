const jwt = require("jsonwebtoken");

// Middleware function for JWT authentication and authorization
function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log(token);
  jwt.verify(token,"adsddgsgahehnr", (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: "Forbidden" });
    }

    // Attach the decoded user to the request object for further use
    req.user = user;
    console.log(req.user)

    next();
  });
}

module.exports = authenticateJWT;
