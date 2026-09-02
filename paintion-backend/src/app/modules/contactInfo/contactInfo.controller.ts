import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ContactInfoService } from "./contactInfo.service"

const getContactInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactInfoService.getFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact info retrieved successfully",
        data: result,
    })
})

const updateContactInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactInfoService.updateIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact info updated successfully",
        data: result,
    })
})

export const ContactInfoController = {
    getContactInfo,
    updateContactInfo,
}