import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js"

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    const { fullname, email, username, password } = req.body;

    // Validation: Check if any fields are empty or invalid
    console.log("email:", email);

    if ([fullname, email, username, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "Please fill all fields");
    }

    // Check if user exists (by username or email)
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Upload and check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload avatar");
    }

    // Upload and check for cover image
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;


    // - Upload avatar and cover image to cloud storage
    const avater = await uploadOnCloudinary(avatarLocalPath)
    if(!avater){
        throw new ApiError(500, "Failed to upload avatar")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    


    // - Create user object and save it to the database

    const user = await User.create({
        fullname,
        avatar:avater.url,
        coverImage:coverImage?.url || "",
        email,
        username:username.toLowerCase(),
        password,

    })
    // remove password and refresh token 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    // - Return success response

    return res.status(201).json(
        new ApiResponce (200,createdUser,"User Registered Successfully !!")
    )

});

export { registerUser };
