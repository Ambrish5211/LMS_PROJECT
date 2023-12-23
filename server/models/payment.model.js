import { Model, Schema } from "mongoose";

const paymentSchema = new Schema({
  payment_id : {
    type: String,
    required: true
  },
  razorpay_subscription_id: {
    type: String,
    required: true
  }, 
  razorpay_signature: {
    type: String,
    required: true
  }
})

const payment = Model('Payment', paymentSchema)