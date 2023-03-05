// tikrinama userio role
// =====================
// asinchroninis klaidu gaudymas
const asyncHandler = require("express-async-handler");
// musu sukurtas middleware- ar vartotojas yra prisijunges (tik, jei pavyko prisijungti, po to galima tikrint ar admin):
const { getUser, notAuthorizedMessage } = require("./helpers/user");

const protectAdmin = asyncHandler(async (req, res, next) => {
  const { status, response } = await getUser(req);

  if (status === 200) {
    if (response.role === "admin") {
      req.user = response;
      next();
    } else {
      res.send(401, notAuthorizedMessage);
    }
  } else {
    res.send(status, response);
  }
});

module.exports = { protectAdmin };
