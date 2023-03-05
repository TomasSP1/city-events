const errorHandler = (err, req, res, next) => {
  // 500 yra server error
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // jei aplinka productiono, tai istrina klaida, bet jei developini, tai klaida irasoma i faila
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
