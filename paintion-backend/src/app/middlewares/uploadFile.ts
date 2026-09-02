// import multer from "multer"
// import path from "path"

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


import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../../config/cloudinary" // path আপনার প্রজেক্ট অনুযায়ী adjust করুন

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "propaint-construction",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    } as any, // TS type mismatch হলে "as any" রাখুন, লাইব্রেরির known issue
})

export const upload = multer({ storage })