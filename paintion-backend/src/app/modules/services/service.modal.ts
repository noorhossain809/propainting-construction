import { Schema, model, Document } from "mongoose"

export interface IService extends Document {
    title: string
    slug: string
    shortDescription: string        // Short description shown on the homepage card
    subtitle: string                // Line under the hero section
    heroImage: {
        url: string
        alt: string
    }
    contentImage: {                 // Image for the "Our Approach" section
        url: string
        alt: string
    }
    contentTitle: string            // e.g. "Our Approach to Professional Painting in NYC"
    contentDescription: string      // Full paragraph(s); separate multiple paragraphs with 

    order: number                   // Sequence in the homepage carousel
    isActive: boolean               // Optionally show/hide on the site
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