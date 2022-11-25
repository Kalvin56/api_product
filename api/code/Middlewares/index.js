const jwt = require("jsonwebtoken");
const config = require("../config");
const { Role } = require("../Model/Role");
const { User } = require("../Model/User");

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "ADMIN") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require ADMIN Role!" });
        return;
      }
    );
  });
};

const middleware = {
  verifyToken,
  isAdmin
};

module.exports = middleware;