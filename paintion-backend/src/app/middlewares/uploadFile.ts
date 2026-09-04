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
import cloudinary from "../../config/cloudinary" // adjust the path to your project

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "propaint-construction",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    } as any, // keep "as any" for the TS type mismatch (known library issue)
})

export const upload = multer({ storage })