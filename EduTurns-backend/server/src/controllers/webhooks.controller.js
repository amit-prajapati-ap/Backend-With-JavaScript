import { Webhook } from 'svix'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'

//API Controller Function to Manage Clerk user with db

const clerkWebhooks = asyncHandler(async (req,res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const {data, type} = req.body

        switch (type) {
            case 'user.created':
                {
                    const userData = {
                        _id: data.id,
                        email: data.email.address[0].email_address,
                        name: data.first_name + " " + data.last_name,
                        imageUrl: data.image_url
                    }
                    await User.create(userData)
                    res.status(200).json(new ApiResponse(200, {}, 'User Created Successfully'))
                    break;
                }
            case 'user.updated':
                {
                    const userData = {
                        email: data.email.address[0].email_address,
                        name: data.first_name + " " + data.last_name,
                        imageUrl: data.image_url
                    }
                    await User.findByIdAndUpdate(data.id,userData)
                    res.status(200).json(new ApiResponse(200, {}, 'User Data Updated Successfully'))
                    break;
                }
            case 'user.deleted':
                {
                    await User.findByIdAndDelete(data.id)
                    res.status(200).json(new ApiResponse(200, {}, 'User Data Deleted Successfully'))
                    break;
                }
        
            default:
                break;
        }
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message, Array(error)))
    }
})

export {clerkWebhooks}