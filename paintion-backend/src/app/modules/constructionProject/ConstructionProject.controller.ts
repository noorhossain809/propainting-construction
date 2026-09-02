import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ConstructionProjectService } from "./constructionProject.service"

const parseJSONField = (field: unknown) => {
    if (typeof field === "string") {
        if (!field.trim()) return undefined
        try {
            return JSON.parse(field)
        } catch (err) {
            return undefined
        }
    }
    return field
}


// const createProject = catchAsync(async (req: Request, res: Response) => {
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] }

//     const parseJSONField = (field: unknown) => {
//         if (typeof field === "string") {
//             if (!field.trim()) return undefined
//             try {
//                 return JSON.parse(field)
//             } catch (err) {
//                 return undefined
//             }
//         }
//         return field
//     }

//     const payload = {
//         ...req.body,
//         mainImage: parseJSONField(req.body.mainImage),
//         gallery: files?.gallery?.map((file) => file.path) || [],
//         results: req.body.results ? req.body.results.split("\n") : [],
//         testimonial: parseJSONField(req.body.testimonial),
//         seo: parseJSONField(req.body.seo),
//     }

//     const result = await ConstructionProjectService.createIntoDB(payload)

//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: "Project created successfully",
//         data: result,
//     })
// })

const createProject = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const mainImageFile = files?.mainImage?.[0]

    const payload = {
        ...req.body,
        mainImage: mainImageFile
            ? {
                  url: mainImageFile.path,       // Cloudinary URL, multer-storage-cloudinary থেকে
                  alt: req.body.mainImageAlt || req.body.title || "",
              }
            : undefined,
        gallery: files?.gallery?.map((file) => file.path) || [],
        results: req.body.results ? req.body.results.split("\n") : [],
        testimonial: parseJSONField(req.body.testimonial),
        seo: parseJSONField(req.body.seo),
    }

    const result = await ConstructionProjectService.createIntoDB(payload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Project created successfully",
        data: result,
    })
})


const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const result = await ConstructionProjectService.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Projects retrieved successfully",
        data: result,
    })
})

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ConstructionProjectService.getOneByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project retrieved successfully",
        data: result,
    })
})

const updateProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const payload: Record<string, unknown> = {
        ...req.body,
    }

    const mainImageFile = files?.mainImage?.[0]
    if (mainImageFile) {
        payload.mainImage = {
            url: mainImageFile.path,
            alt: req.body.mainImageAlt || req.body.title || "",
        }
    } else if (req.body.mainImage !== undefined) {
        // যদি নতুন file না দেয়, কিন্তু alt টেক্সট বা অন্য কিছু body তে থাকে
        payload.mainImage = parseJSONField(req.body.mainImage)
    }

    if (req.body.testimonial !== undefined) {
        payload.testimonial = parseJSONField(req.body.testimonial)
    }
    if (req.body.seo !== undefined) {
        payload.seo = parseJSONField(req.body.seo)
    }
    if (req.body.results !== undefined) {
        payload.results = req.body.results ? req.body.results.split("\n") : []
    }
    if (files?.gallery?.length) {
        payload.gallery = files.gallery.map((file) => file.path)
    }

    const result = await ConstructionProjectService.updateIntoDB(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project updated successfully",
        data: result,
    })
})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ConstructionProjectService.deleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project deleted successfully",
        data: result,
    })
})


export const ConstructionProjectController = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject
}


