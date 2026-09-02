import { Schema, model, Document } from "mongoose"

export interface IService extends Document {
    title: string
    slug: string
    shortDescription: string        // Homepage card এ দেখানোর জন্য ছোট বর্ণনা
    subtitle: string                // Hero section এর নিচের লাইন
    heroImage: {
        url: string
        alt: string
    }
    contentImage: {                 // "Our Approach" সেকশনের ছবি
        url: string
        alt: string
    }
    contentTitle: string            // যেমন: "Our Approach to Professional Painting in NYC"
    contentDescription: string      // পুরো paragraph(s), \n দিয়ে multiple para আলাদা
    order: number                   // homepage carousel এ sequence
    isActive: boolean               // চাইলে সাইটে hide/show করা যাবে
    seo?: {
        metaTitle?: string
        metaDescription?: string
        keywords?: string[]
    }
    createdAt: Date
    updatedAt: Date
}

const serviceSchema = new Schema<IService>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        shortDescription: { type: String, required: true },
        subtitle: { type: String, required: true },
        heroImage: {
            url: { type: String, required: true },
            alt: { type: String, default: "" },
        },
        contentImage: {
            url: { type: String, required: true },
            alt: { type: String, default: "" },
        },
        contentTitle: { type: String, required: true },
        contentDescription: { type: String, required: true },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        seo: {
            metaTitle: { type: String },
            metaDescription: { type: String },
            keywords: [{ type: String }],
        },
    },
    { timestamps: true }
)

const Service = model<IService>("Service", serviceSchema)
export default Service