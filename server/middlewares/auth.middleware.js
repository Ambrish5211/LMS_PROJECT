import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError( 401, "No token, please Login"));
  }

  const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!tokenDetails) {
    return next(new AppError("Unauthenticated, please login", 401));
  }

  req.user = tokenDetails;

  next();
};

const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentRole = req.user.role;
    console.log(currentRole);

    if (!roles.includes(currentRole)) {
      return next(
        new AppError(403, "You do not have permission to access this route")
      );
    }

    next();
  };

const authorizedSubscriber = async (req, res, next) => {
  const subscriptionStatus = req.user.subscription.status;

  if (req.user.role !== "ADMIN" && subscriptionStatus !== "active") {
    return next(new AppError(403, "Please Subscribe to access this route"));
  }

  next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
