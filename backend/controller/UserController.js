const User = require("../model/UserModel")
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js")
const sendMail = require("../utils/sendMail.js")
//register
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"https://test.com",
            url:"https://test.com"

        }
    })
    const token = user.getJwtToken();
    res.status(201).json({
        success:true,
        token
    })
})
// login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter the email & password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(
            new ErrorHandler("User is not find with this email & password", 401)
        );
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(
            new ErrorHandler("User is not find with this email & password", 401)
        );
    }

    sendToken(user, 201, res);
});
// logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

//  Get user Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});
// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(
            new ErrorHandler("Old Password is incorrect", 400)
        );
    };

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
            new ErrorHandler("Password not matched with each other", 400)
        );
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});
//prodil3
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidator: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
// all us3r
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});
// Get Single User 
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User is not found with this id", 400));
    }

    res.status(200).json({
        success: true,
        user,
    });
});
// Change user Role 
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
});
// xoa us3r
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User is not found with this id", 400));
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
});