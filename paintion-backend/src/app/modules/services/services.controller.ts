import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ServiceService } from "./services.service"


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

const createService = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const heroImageFile = files?.heroImage?.[0]
    const contentImageFile = files?.contentImage?.[0]

    if (!heroImageFile || !contentImageFile) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Both Hero Image and Content Image are required",
            data: null,
        })
    }

    const payload = {
        ...req.body,
        order: req.body.order ? Number(req.body.order) : 0,
        isActive: req.body.isActive === "false" ? false : true,
        heroImage: {
            url: heroImageFile.path,
            alt: req.body.heroImageAlt || req.body.title || "",
        },
        contentImage: {
            url: contentImageFile.path,
            alt: req.body.contentImageAlt || req.body.title || "",
        },
        seo: parseJSONField(req.body.seo),
    }

    const result = await ServiceService.createIntoDB(payload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service created successfully",
        data: result,
    })
})

const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
    })
})

const getSingleService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ServiceService.getOneByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    })
})

const updateService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const payload: Record<string, unknown> = { ...req.body }

    if (req.body.order !== undefined) payload.order = Number(req.body.order)
    if (req.body.isActive !== undefined) payload.isActive = req.body.isActive !== "false"

    const heroImageFile = files?.heroImage?.[0]
    if (heroImageFile) {
        payload.heroImage = {
            url: heroImageFile.path,
            alt: req.body.heroImageAlt || req.body.title || "",
        }
    }

    const contentImageFile = files?.contentImage?.[0]
    if (contentImageFile) {
        payload.contentImage = {
            url: contentImageFile.path,
            alt: req.body.contentImageAlt || req.body.title || "",
        }
    }

    if (req.body.seo !== undefined) {
        payload.seo = parseJSONField(req.body.seo)
    }

    const result = await ServiceService.updateIntoDB(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result,
    })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ServiceService.deleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted successfully",
        data: result,
    })
})

export const ServiceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
}