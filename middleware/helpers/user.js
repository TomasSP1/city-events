const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const NOT_AUTHORIZED = "Not authorized user";
const NOT_AUTHORIZED_NO_TOKEN = "Not authorized, no token";

async function getUser(req) {
  // tikrina ar yra autorizavimas headeriuose ir ar jis prasideda zodziu "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // paima JWT: kadangi jis bus "Bearer <token>", tai splitina ties tarpleiu,praleidzia BEARER ir ima token'a
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NOT_AUTHORIZED_NO_TOKEN };
      }

      // papoildomai uzkoduoja su ta "druskyte", be kurios neimanoma atkoduoti JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // suranda useriu collectione pagal uzkoduota ID ir "-password" tam, kad nepaimtu password'o
      const user = await User.findById(decoded.id).select("-password");

      return { status: 200, response: user };
    } catch (error) {
      console.log(error);

      return { status: 401, response: NOT_AUTHORIZED };
    }
  }

  return { status: 401, response: NOT_AUTHORIZED };
}

module.exports = { getUser, notAuthorizedMessage: NOT_AUTHORIZED };
