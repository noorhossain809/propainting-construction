"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactMessageSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const ContactMessage = (0, mongoose_1.model)("ContactMessage", contactMessageSchema);
exports.default = ContactMessage;
