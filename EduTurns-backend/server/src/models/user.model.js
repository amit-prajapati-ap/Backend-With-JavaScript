import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    enrolledCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
}, { timestamps: true })

export const User = model("user", userSchema)