"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Service = (0, mongoose_1.model)("Service", serviceSchema);
exports.default = Service;
