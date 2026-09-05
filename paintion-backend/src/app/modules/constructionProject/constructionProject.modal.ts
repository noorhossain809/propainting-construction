import mongoose, { Document, models, Schema } from 'mongoose';

// --- Sub-schemas (Nested Objects) ---

// Sub-schema for the Testimonial
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

// Sub-schema for SEO
const seoSchema = new Schema({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  // Even if entered comma/newline-separated in the form, store as an array in the DB
  keywords: [
    {
      type: String,
    },
  ],
});

// --- Main Project schema ---

// Interface for TypeScript (optional but recommended)
export type IProject = {
  title: string;
  slug: string;
  projectType: 'Interior Painting' | 'Exterior Painting' | 'Commercial Painting' | 'Renovation';
  category: string;
  description: string;
  location?: string;
  duration?: string;
  completedDate?: Date;
  mainImage: {
    url: string;
    alt: string;
  };
  gallery: string[]; // Array of image URLs only
  challenge?: string;
  solution?: string;
  results: string[]; // Each result is one array item
  testimonial?: typeof testimonialSchema; // optional
  seo?: typeof seoSchema; // optional
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
    // 'type' is a reserved Mongoose keyword, so use 'projectType' instead
    projectType: {
      type: String,
      enum: ['Interior Painting', 'Exterior Painting', 'Commercial Painting', 'Renovation'],
      required: [true, 'Project type is required'],
    },
    // Free-form so predefined categories AND custom ("Others") values are allowed.
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
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
    // After file upload, store only the URL and alt text
     mainImage: {
       url: { type: String, required: [true, 'Main image URL is required'] },
       alt: { type: String, required: [true, 'Main image alt text is required'] },
     },
    gallery: [
      {
        type: String, // holds the array of image URLs
      },
    ],

    // --- In-Depth Details ---
    challenge: {
      type: String,
    },
    solution: {
      type: String,
    },
    // Though a single textarea in the form, split on newlines into an array before saving
    results: [
      {
        type: String,
      },
    ],

    // --- Testimonial (Optional) ---
    testimonial: {
      type: testimonialSchema,
      required: false, // the whole section is optional
    },

    // --- SEO (Optional) ---
    seo: {
      type: seoSchema,
      required: false, // the whole section is optional
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Prevent duplicate model compilation
const Project = models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;