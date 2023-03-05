const asyncHandler = require("express-async-handler");
const { getUser } = require("./helpers/user");

const protect = asyncHandler(async (req, res, next) => {
  const { status, response } = await getUser(req);

  if (status === 200) {
    req.user = response;
    // tarpinej funkcijoj, jei jau ivykdo viska cia, pasakau, kad eik i kita
    next();
  } else {
    res.send(status, response);
  }
});

module.exports = { protect };