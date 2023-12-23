import AppError from "../utils/appError.js"


export const getRazorpayApiKey = async (req, res, next) => {
  try {
     res.status(200).json({
      success:true,
      message: 'RAZORPAY_API_KEY:',
      key: process.env.RAZORPAY_KEY_ID  
     })
  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }

}

export const buySubscription = async (req, res, next) => {
  try {
    const {id} = req.user;
    const user = await User.findById(id);

    if(!user){
      return next(new AppError('Unauthorized, please login', 500))
    }

    if(user.role == "ADMIN"){
      return next(new AppError('Admin cannot buy a subscription', 500))

    }



  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}

export const verifySubscription = async (req, res, next) => {
  try {
    
  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}

export const cancelSubscription = async (req, res, next) => {
  try {
    
  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}

export const getAllPayments = async (req, res, next) => {
  try {
    
  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}