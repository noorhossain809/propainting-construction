import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { TeamService } from "./team.service"

const createTeamMember = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const imageFile = files?.image?.[0]

    if (!imageFile) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Image is required",
            data: null,
        })
    }

    const payload = {
        ...req.body,
        order: req.body.order ? Number(req.body.order) : 0,
        isActive: req.body.isActive === "false" ? false : true,
        image: {
            url: imageFile.path,
            alt: req.body.imageAlt || req.body.name || "",
        },
    }

    const result = await TeamService.createIntoDB(payload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Team member created successfully",
        data: result,
    })
})

const getAllTeamMembers = catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team members retrieved successfully",
        data: result,
    })
})

const getSingleTeamMember = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await TeamService.getOneByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team member retrieved successfully",
        data: result,
    })
})

const updateTeamMember = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const payload: Record<string, unknown> = { ...req.body }

    if (req.body.order !== undefined) payload.order = Number(req.body.order)
    if (req.body.isActive !== undefined) payload.isActive = req.body.isActive !== "false"

    const imageFile = files?.image?.[0]
    if (imageFile) {
        payload.image = {
            url: imageFile.path,
            alt: req.body.imageAlt || req.body.name || "",
        }
    }

    const result = await TeamService.updateIntoDB(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team member updated successfully",
        data: result,
    })
})

const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await TeamService.deleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team member deleted successfully",
        data: result,
    })
})

export const TeamController = {
    createTeamMember,
    getAllTeamMembers,
    getSingleTeamMember,
    updateTeamMember,
    deleteTeamMember,
}