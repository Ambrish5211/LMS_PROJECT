import { Schema, model } from "mongoose";


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [5, "Name must be less than 50 character"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: false,
    trim: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please fill valid email address",
    ],
  },
  message: {
    type:String,
    required: [true, "Need some message"],
    trim: true,
  }
})

const ContactModel = new model('ContactModel', contactSchema)

export default ContactModel;