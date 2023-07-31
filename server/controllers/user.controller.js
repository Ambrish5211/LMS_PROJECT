import AppError from '../utils/appError.js';
import User from '../models/user.models.js';
import sendEmail from '../utils/sendemail.js';
import cloudinary from 'cloudinary';


const cookieOptions = {
  secure: true,
  maxAge: 7* 24 * 24* 60 * 1000,
  httpOnly: true
  
}

const register = async (req, res, next) => {
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

  if(req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', 
        width: 250,
        height: 250,
        gravity: 'faces',
        crop: 'fill'
      });
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(new AppError(e.message || 'File not uploaded', 500))
    }
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

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;


  if(!email) {
    return next(
      new AppError('Email is required', 400)
    )
  }

const user = await User.findOne ({ email });

if(!user) {
  return next(
    new AppError('Email is not registered', 400)
  )
}

  const resetToken = await user.generatePasswordToken();

  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = 'Reset Password';
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your Password</a>`;

try {
  await sendEmail(email, subject, message);

  res.status(200).json ({
    success:true,
    message: `reset password token has been sent to ${email} successfully`
  })
} catch (error) {

  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;
  await user.save();
  return next(new AppError(error.message, 500));
  
}


}

const resetPassword = async (req, res, next) => {

}

export {register, login, logout, getProfile, forgotPassword, resetPassword};