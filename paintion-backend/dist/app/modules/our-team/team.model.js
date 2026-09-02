"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamMemberSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    image: {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
    },
    bio: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const TeamMember = (0, mongoose_1.model)("TeamMember", teamMemberSchema);
exports.default = TeamMember;
