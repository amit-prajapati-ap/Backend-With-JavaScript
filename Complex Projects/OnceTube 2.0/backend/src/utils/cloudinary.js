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
        // console.log("File Uploaded On Cloudinary :", response.url);

        fs.unlinkSync(localFilePath)

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removing the locally saved temporary file as the upload operation got failed

        return null
    }
}

async function deleteImageByUrl(imageUrl) {
    const parts = imageUrl.split('/');
    const fileWithExtension = parts[parts.length - 1];
    const publicId = fileWithExtension.split('.')[0];

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result
    } catch (error) {
        console.error('Error while deleting the image from cloudinary:', error);
        return null
    }
}

export { uploadOnCloudinary, deleteImageByUrl }