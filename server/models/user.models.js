import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema ({
  fullName: {
    type: String,
    required: [true, "Email is required"],
    minLength: [5, "Name must be less than 50 character"],
    lowercase: true,
    trim: true
  },
email : {
  type:String,
  required: [true, "Email is required"],
  unique: true,
  lowercase: true,
  trim:true,
  match: [
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , 'Please fill valid email address'
  ]
},
password: {
  type: String,
  required: [true, "Password is required"],
  minLength: [8, "Password must be atleast 8 character"],
  select: false
},
role: {
  type: String,
  enum: ["USER", "ADMIN"],
  default: 'USER'
},
avatar: {
  public_id: {
    type: String
  },
  secure_url: {
    type: String
  }
},
forgotPasswordToken: String,
forgotPasswordExpiry: Date

},{timestamps : true})

userSchema.pre('save', async function(){
  if(!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods = {
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password)},
    
    generateJWTToken: function () {
      return jwt.sign(
        {id: this._id, role: this.role, email:this.email, subscription: this.subscription},
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY
        }
      )
    }
  }


const User = model('User', userSchema);

export default User;