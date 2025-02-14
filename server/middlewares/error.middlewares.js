const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined
  });
};

export default errorMiddleware;
