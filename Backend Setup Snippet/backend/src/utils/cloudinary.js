import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { loadEnvFile } from 'process';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!loadEnvFile) {
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log("File Uploaded On Cloudinary :", response.url);
        
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removing the locally saved temporary file as the upload operation got failed

        return null
    }
}

export {uploadOnCloudinary}