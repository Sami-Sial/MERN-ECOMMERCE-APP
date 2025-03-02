const AsyncErrorHandler = require("../utils/AsyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// module.exports.isUserExist = AsyncErrorHandler(async (req, res, next) => {
//     console.log(req.body)
//     const { email } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//         return next(new ErrorHandler(400, "User with given email already exists"));
//     }

//     next();
// })

module.exports.isAuthenticatedUser = async (req, res, next) => {
  console.log(req.headers);
  console.log("samit", token);

  let token;
  if (
    req.headers["Authorization"] &&
    req.headers["Authorization"].startsWith("Bearer")
  ) {
    const token = req.headers["Authorization"]?.split("Bearer")[1];
  } else {
    return next(new ErrorHandler(401, "Please Login to access this Resource"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        403,
        `Role: ${req.user.role} is not allowed to access this resource`
      )
    );
  }

  next();
};
