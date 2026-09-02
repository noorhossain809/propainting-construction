"use strict";
// import multer from "multer"
// import path from "path"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(process.cwd(), "uploads"))
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = `${Date.now()}-${file.originalname}`
//         cb(null, uniqueName)
//     },
// })
// export const upload = multer({ storage })
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../../config/cloudinary")); // path আপনার প্রজেক্ট অনুযায়ী adjust করুন
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        folder: "propaint-construction",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }, // TS type mismatch হলে "as any" রাখুন, লাইব্রেরির known issue
});
exports.upload = (0, multer_1.default)({ storage });
