import { razorpay } from "../server.js"
import AppError from "../utils/appError.js"
import Payment from '../models/payment.model.js'
import User from '../models/user.models.js';


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
    console.log(id)
    const user = await User.findById(id);

    if(!user){
      return next(new AppError('Unauthorized, please login', 500))
    }

    if(user.role === "ADMIN"){
      return next(new AppError('Admin cannot buy a subscription', 500))

    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count:6,
    });

    user.subscription.id = subscription.id
    user.subscription.status = subscription.status

    res.status(200).json({
      success: true,
      message: "Subscription successful"
    })

  } catch (error) {
    console.log(error)
    return next(
      new AppError(error.message, 500)
    )
  }
}

export const verifySubscription = async (req, res, next) => {
  try {

    const {id} = req.user
    const user = User.findById(id)
    
    const {razorpay_payment_id, razorpay_signature, razorpay_subscription_id} =  req.body;

    const generatedSignature = crypto
        .createHmac('sha256', process.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id} | ${razorpay_payment_id}`)

    if (generatedSignature !== razorpay_signature) {
      return next(
        new AppError('Payment not verified, please try again', 500)
      )
    }

    // Record Payment details in Payment Collection

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id
    })

    // Update user with payment details

    user.subscription.status = 'active';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully`'
    })
    

  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}

export const cancelSubscription = async (req, res, next) => {
  try {
    const {id} = req.user;
    const user = await User.findById(id);

    if(!user){
      return next(new AppError('Unauthorized, please login', 500))
    }

    if(user.role == "ADMIN"){
      return next(new AppError('Admin cannot buy a subscription', 500))
    }

    const subscriptionId = user.subscription.id;

    const subscription  = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Subscription is cancelled"
    })



  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}

export const getAllPayments = async (req, res, next) => {
  try {

    const {count} = req.query;

    const subscription = await razorpay.subscriptions.all({
      count: count || 10,
    })

    res.status(200).json({
      success: true,
      message: "All Payments",
      payments: subscription
    })
    
  } catch (error) {
    return next(
      new AppError(error.message, 500)
    )
  }
}