import { Request, Response } from "express"
import httpStatus from "http-status"

import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { AuthService } from "./auth.service"


const login = catchAsync(async (req: Request, res: Response) => {
    const { token, user } = await AuthService.loginUser(req.body)

    // Set the token in an httpOnly cookie — safer against XSS
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login successful",
        data: { token, user }, // also return the token in the body so the frontend can use it via a header
    })
})

const googleLogin = catchAsync(async (req: Request, res: Response) => {
    const { idToken } = req.body

    const { token, user } = await AuthService.googleLogin(idToken)

    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Google login successful",
        data: { token, user },
    })
})

const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken")

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logout successful",
        data: null,
    })
})

const getMe = catchAsync(async (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrieved successfully",
        data: (req as any).user, // set by the auth middleware
    })
})

export const AuthController = {
    login,
    logout,
    getMe,
    googleLogin
}