import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { HeroSlideService } from "./heroSlide.service"

const createHeroSlide = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const backgroundImageFile = files?.backgroundImage?.[0]
    const mediaType = req.body.mediaType === "video" ? "video" : "image"

    if (mediaType === "image" && !backgroundImageFile) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Background image is required when media type is image",
            data: null,
        })
    }

    if (mediaType === "video" && !req.body.videoUrl) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Video URL is required when media type is video",
            data: null,
        })
    }

    const payload = {
        ...req.body,
        mediaType,
        order: req.body.order ? Number(req.body.order) : 0,
        isActive: req.body.isActive === "false" ? false : true,
        backgroundImage: backgroundImageFile
            ? {
                  url: backgroundImageFile.path,
                  alt: req.body.backgroundImageAlt || req.body.title || "",
              }
            : undefined,
        videoUrl: mediaType === "video" ? req.body.videoUrl : undefined,
    }

    const result = await HeroSlideService.createIntoDB(payload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Hero slide created successfully",
        data: result,
    })
})

const getAllHeroSlides = catchAsync(async (req: Request, res: Response) => {
    const result = await HeroSlideService.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hero slides retrieved successfully",
        data: result,
    })
})

const getSingleHeroSlide = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await HeroSlideService.getOneByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hero slide retrieved successfully",
        data: result,
    })
})

const updateHeroSlide = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const payload: Record<string, unknown> = { ...req.body }

    if (req.body.order !== undefined) payload.order = Number(req.body.order)
    if (req.body.isActive !== undefined) payload.isActive = req.body.isActive !== "false"

    const backgroundImageFile = files?.backgroundImage?.[0]
    if (backgroundImageFile) {
        payload.backgroundImage = {
            url: backgroundImageFile.path,
            alt: req.body.backgroundImageAlt || req.body.title || "",
        }
    }

    if (req.body.mediaType !== undefined) {
        payload.mediaType = req.body.mediaType
        // মিডিয়া টাইপ ভিন্ন হয়ে গেলে অপ্রাসঙ্গিক field মুছে দাও
        if (req.body.mediaType === "video") {
            payload.videoUrl = req.body.videoUrl
        }
    }

    const result = await HeroSlideService.updateIntoDB(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hero slide updated successfully",
        data: result,
    })
})

const deleteHeroSlide = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await HeroSlideService.deleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Hero slide deleted successfully",
        data: result,
    })
})

export const HeroSlideController = {
    createHeroSlide,
    getAllHeroSlides,
    getSingleHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
}