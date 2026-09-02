import { Schema, model, Document } from "mongoose"

export interface IContactMessage extends Document {
    name: string
    phone: string
    email: string
    projectType: string
    projectDetails?: string
    status: "new" | "read" | "archived"
    createdAt: Date
    updatedAt: Date
}

const contactMessageSchema = new Schema<IContactMessage>(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        projectType: { type: String, required: true },
        projectDetails: { type: String },
        status: {
            type: String,
            enum: ["new", "read", "archived"],
            default: "new",
        },
    },
    { timestamps: true }
)

const ContactMessage = model<IContactMessage>(
    "ContactMessage",
    contactMessageSchema
)
export default ContactMessage
