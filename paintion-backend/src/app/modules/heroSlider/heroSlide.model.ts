import { Schema, model } from "mongoose"

export interface IHeroSlide extends Document {
    badgeText?: string
    title: string
    subtitle?: string
    mediaType: "image" | "video"
    backgroundImage?: {
        url: string
        alt: string
    }
    videoUrl?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    order: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const heroSlideSchema = new Schema<IHeroSlide>(
    {
        badgeText: { type: String },
        title: { type: String, required: true },
        subtitle: { type: String },
        mediaType: { type: String, enum: ["image", "video"], default: "image", required: true },
        backgroundImage: {
            url: { type: String },
            alt: { type: String, default: "" },
        },
        videoUrl: { type: String },
        primaryButtonText: { type: String },
        primaryButtonLink: { type: String },
        secondaryButtonText: { type: String },
        secondaryButtonLink: { type: String },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

const HeroSlide = model<IHeroSlide>("HeroSlide", heroSlideSchema)
export default HeroSlide