import { Schema, model } from "mongoose";

const subscriptionsSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //One who is subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, //One to whome subsciber is subscribing
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = model("Subscription", subscriptionsSchema)