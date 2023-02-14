const { verify } = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = function (req, res, next) {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).send(["Usuário sem permissão"]);
  }

  verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send(["Usuário sem permissão"]);
    }

    req.user_id = decoded.id;

    next(); //Se não chamar o next então ele pára aqui e não segue o fluxo
  });
};

const verifyUserJWT = function (req, res, next) {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).send(["Usuário sem permissão"]);
  }

  verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send(["Usuário sem permissão"]);
    }

    req.user_id = decoded.id;

    next(); //Se não chamar o next então ele pára aqui e não segue o fluxo
  });
};

module.exports = {
  verifyJWT,
  verifyUserJWT
};
