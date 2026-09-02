"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const heroSlideSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const HeroSlide = (0, mongoose_1.model)("HeroSlide", heroSlideSchema);
exports.default = HeroSlide;
