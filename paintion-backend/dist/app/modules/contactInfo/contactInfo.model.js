"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactInfoSchema = new mongoose_1.Schema({
    phoneOne: { type: String, required: true },
    phoneTwo: { type: String },
    workingHours: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    insuranceText: { type: String, required: true },
}, { timestamps: true });
const ContactInfo = (0, mongoose_1.model)("ContactInfo", contactInfoSchema);
exports.default = ContactInfo;
