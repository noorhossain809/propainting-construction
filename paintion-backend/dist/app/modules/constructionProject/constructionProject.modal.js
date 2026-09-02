"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// --- সাব-স্কিমা (Nested Objects) ---
// Testimonial-এর জন্য সাব-স্কিমা
const testimonialSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
});
// SEO-এর জন্য সাব-স্কিমা
const seoSchema = new mongoose_1.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    // ফর্মে কমা বা নতুন লাইন দিয়ে ইনপুট নিলেও, ডাটাবেসে অ্যারে হিসেবে রাখাই ভালো
    keywords: [
        {
            type: String,
        },
    ],
});
const projectSchema = new mongoose_1.Schema({
    // --- Basic Information ---
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    // 'type' একটি Mongoose-এর নিজস্ব কি-ওয়ার্ড, তাই 'projectType' ব্যবহার করা ভালো
    projectType: {
        type: String,
        enum: ['Interior Painting', 'Exterior Painting', 'Commercial Painting', 'Renovation'],
        required: [true, 'Project type is required'],
    },
    category: {
        type: String,
        enum: ['interior', 'exterior', 'commercial'],
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    location: {
        type: String,
    },
    duration: {
        type: String,
    },
    completedDate: {
        type: Date,
    },
    // --- Images ---
    // ফাইল আপলোডের পর আপনি শুধু URL এবং alt টেক্সট সেভ করবেন
    mainImage: {
        url: { type: String, required: [true, 'Main image URL is required'] },
        alt: { type: String, required: [true, 'Main image alt text is required'] },
    },
    gallery: [
        {
            type: String, // এখানে ইমেজ URL গুলোর অ্যারে থাকবে
        },
    ],
    // --- In-Depth Details ---
    challenge: {
        type: String,
    },
    solution: {
        type: String,
    },
    // ফর্মে একটি textarea থাকলেও, API-তে সেভ করার আগে একে new line ('\n') দিয়ে split করে অ্যারে বানিয়ে ফেলা ভালো
    results: [
        {
            type: String,
        },
    ],
    // --- Testimonial (Optional) ---
    testimonial: {
        type: testimonialSchema,
        required: false, // পুরো সেকশনটি ঐচ্ছিক
    },
    // --- SEO (Optional) ---
    seo: {
        type: seoSchema,
        required: false, // পুরো সেকশনটি ঐচ্ছিক
    },
}, {
    timestamps: true, // createdAt এবং updatedAt অটোমেটিক যোগ করবে
});
// ডুপ্লিকেট মডেল তৈরি হওয়া বন্ধ করার জন্য
const Project = mongoose_1.models.Project || mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
