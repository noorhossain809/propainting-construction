import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
import { ICloudinaryResponse, IFileUpload } from '../interfaces/file';
          
cloudinary.config({ 
  cloud_name: 'dmwv7v4so', 
  api_key: '439729139927115', 
  api_secret: 'MNfIMXbDtWacZvRPaJCSfvmeYpM' 
});

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({storage: storage})

const uploadCloudinary = async (file: IFileUpload) : Promise<ICloudinaryResponse> => {
    return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path,
        (error : Error, result: ICloudinaryResponse) => {
            fs.unlinkSync(file.path)
            if(error){
                reject(error)
            }
            else{
                resolve(result)
            }
        }
    );
    })
}

export const FileUploadHelper = {
    uploadCloudinary,
    upload
}