import AppError from '../utils/appError.js';
import User from '../models/user.models.js';

const cookieOptions = {
  secure: true,
  maxAge: 7* 24 * 24* 60 * 1000,
  httpOnly: true
  
}

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if(!fullName || !email || !password){
    return next(new AppError('All fields are required', 400));
  }

  const userExists = await User.findOne({ email });

  if(userExists) {
    return next(new AppError('User already exists', 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: ''
    }
  });

  if(!user) {
    return next(new AppError('User registration failed', 400))
  }

await user.save();

// TODO: get JWT token in cookie

user.password = undefined;

res.status(200).json({
  success: true,
  message: 'User registered successfully',
  user
})

}

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new AppError('All fields are required', 400));
  }

  const user = await User.findOne({
    email
  }).select('+password');
  
  if(!user || user.comparePassword(password)) { // TODO
    return next(new AppError('Email or password do not match', 400));
  }

  const token = await user.generateJWTToken();
  user.password = undefined;

  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User registered Successfully',
    user
  })

}

const logout = (req, res) => {
  res.cookie('token', null, {
    secure:true,
    maxAge: 0,
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  })
  
}

const getProfile = (req, res) => {
  const user = User.findById(req.user.id);

  res.status(200).json({
    success:true,
    message: 'User details',
    user
  })
  
}

export {register, login, logout, getProfile};