"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    donationDate: {
        type: Date,
        required: true
    },
    donationTime: {
        type: String,
        required: true
    },
    patientDiseaseInfo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'cancel', 'done'],
        default: 'pending'
    },
    hospitalName: {
        type: String,
        required: true
    },
    requestMessageType: {
        type: String,
        enum: ['normal', 'urgent']
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Patient = (0, mongoose_1.model)('Patient', patientSchema);
