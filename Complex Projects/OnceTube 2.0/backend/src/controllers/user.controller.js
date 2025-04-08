import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    //----------Steps-----------
    //get user details from frontend through postman
    //validation - not empty
    //check if user already exists: email, username
    //check for images, check for avatar compulsory
    //upload images to cloudnary, avatar compulsory
    //create user object - create entry in db
    //check for user creation
    //if user not created then return null
    //remove password and refresh token field from response
    //return response

    const { fullname, email, username, password } = req?.body || {
        fullname: "",
        email: "",
        username: "",
        password: ""
    }

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    // console.log(existedUser)

    if (existedUser) {
        throw new ApiError(409, "User with email or username is already exist")
    }

    let avatarLocalPath = null
    let coverImageLocalPath = null 
    
    if(req.files && req.files.avatar && req.files.coverImage[0].path) {
        avatarLocalPath = req.files?.avatar[0]?.path
    }
    if(req.files && req.files.coverImage && req.files.coverImage[0].path) {
        coverImageLocalPath = req.files?.coverImage[0]?.path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    let coverImage = null

    if (coverImageLocalPath) {        
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
    }

    if (!avatar) {
        throw new ApiError(400, "Avatar file is not uploaded")
    }

    const user = await User.create({
        fullname: fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email: email,
        password: password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Internal server error while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

export { registerUser }