import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ContactMessageService } from "./contactMessage.service"
import { sendEmail } from "../../../helpers/sendEmail"

const escapeHtml = (value = "") =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

const buildNotificationHtml = (msg: {
    name: string
    phone: string
    email: string
    projectType: string
    projectDetails?: string
}) => `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color:#0B2653;">New Quote Request</h2>
      <p>You have received a new contact form submission on Pro Painting Construction.</p>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:8px; font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(msg.name)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(msg.phone)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;">${escapeHtml(msg.email)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Project Type</td><td style="padding:8px;">${escapeHtml(msg.projectType)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold; vertical-align:top;">Details</td><td style="padding:8px;">${escapeHtml(msg.projectDetails || "—")}</td></tr>
      </table>
    </div>
`

const createMessage = catchAsync(async (req: Request, res: Response) => {
    const { name, phone, email, projectType, projectDetails } = req.body

    // Basic required-field validation (public endpoint).
    if (!name || !phone || !email || !projectType) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Name, phone, email and project type are required",
            data: null,
        })
    }

    const result = await ContactMessageService.createIntoDB({
        name,
        phone,
        email,
        projectType,
        projectDetails,
    })

    // Notify the site inbox (best-effort — never blocks the response).
    void sendEmail({
        subject: `New Quote Request from ${name}`,
        html: buildNotificationHtml({ name, phone, email, projectType, projectDetails }),
        replyTo: email,
    })

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Your message has been sent successfully",
        data: result,
    })
})

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactMessageService.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact messages retrieved successfully",
        data: result,
    })
})

const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ContactMessageService.getOneByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact message retrieved successfully",
        data: result,
    })
})

const updateMessageStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const { status } = req.body
    const result = await ContactMessageService.updateStatusInDB(id, status)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact message updated successfully",
        data: result,
    })
})

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ContactMessageService.deleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact message deleted successfully",
        data: result,
    })
})

export const ContactMessageController = {
    createMessage,
    getAllMessages,
    getSingleMessage,
    updateMessageStatus,
    deleteMessage,
}
