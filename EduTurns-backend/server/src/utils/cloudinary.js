import fs from 'fs'
import { loadEnvFile } from 'process'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        const response = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: 'auto'
            })

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteImageByUrl = async (imageUrl) => {
    const parts = imageUrl.split('/')
    const fileWithExtension = parts[parts.length - 1]
    const publicId = fileWithExtension.split('.')[0]

    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.log("Error while deleting the image from cloudinary: ", error)
        return null
    }
}

export { uploadOnCloudinary, deleteImageByUrl }