const errorMiddleware = (error, req, res, next) => {
  req.statusCode = res.statusCode || 500;
  req.message = req.message || "Something went wrong";

  return res.status(req.statusCode).json({
    success: false,
    message: req.message,
    stack: error.stack
  });
}

export default errorMiddleware;