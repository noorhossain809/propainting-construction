import { Schema, model, Document } from "mongoose"

export type IContactInfo = Document & {
    phoneOne: string
    phoneTwo?: string
    workingHours: string        // e.g. "Mon-Fri 7AM-6PM" / "Call Support Center 24/7"
    email: string
    location: string            // e.g. "4017, ave D, Brooklyn New York, 11203"
    licenseNumber: string       // e.g. "2105436-DCA"
    insuranceText: string       // e.g. "Fully insured for your protection"
    createdAt: Date
    updatedAt: Date
}

const contactInfoSchema = new Schema<IContactInfo>(
    {
        phoneOne: { type: String, required: true },
        phoneTwo: { type: String },
        workingHours: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: String, required: true },
        licenseNumber: { type: String, required: true },
        insuranceText: { type: String, required: true },
    },
    { timestamps: true }
)

const ContactInfo = model<IContactInfo>("ContactInfo", contactInfoSchema)
export default ContactInfo