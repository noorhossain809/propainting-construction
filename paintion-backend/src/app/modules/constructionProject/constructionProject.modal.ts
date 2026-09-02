import mongoose, { Document, models, Schema } from 'mongoose';

// --- সাব-স্কিমা (Nested Objects) ---

// Testimonial-এর জন্য সাব-স্কিমা
const testimonialSchema = new Schema({
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
const seoSchema = new Schema({
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

// --- প্রধান প্রজেক্ট স্কিমা ---

// TypeScript-এর জন্য Interface (Optional but recommended)
export type IProject = {
  title: string;
  slug: string;
  projectType: 'Interior Painting' | 'Exterior Painting' | 'Commercial Painting' | 'Renovation';
  category: 'interior' | 'exterior' | 'commercial';
  description: string;
  location?: string;
  duration?: string;
  completedDate?: Date;
  mainImage: {
    url: string;
    alt: string;
  };
  gallery: string[]; // শুধু ইমেজ URL গুলোর অ্যারে
  challenge?: string;
  solution?: string;
  results: string[]; // প্রতিটি রেজাল্ট অ্যারের একটি আইটেম হবে
  testimonial?: typeof testimonialSchema; // ঐচ্ছিক
  seo?: typeof seoSchema; // ঐচ্ছিক
  createdAt: Date;
  updatedAt: Date;
} & Document

const projectSchema = new Schema<IProject>(
  {
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
  },
  {
    timestamps: true, // createdAt এবং updatedAt অটোমেটিক যোগ করবে
  }
);

// ডুপ্লিকেট মডেল তৈরি হওয়া বন্ধ করার জন্য
const Project = models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;