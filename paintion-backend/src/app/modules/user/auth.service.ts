import { OAuth2Client } from "google-auth-library"
import httpStatus from "http-status"
import jwt, { SignOptions } from "jsonwebtoken"

import ApiError from "../../../errors/ApiError"
import User from "../user/user.modal"

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const generateToken = (user: any) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"] }
    )
}

const loginUser = async (payload: { email: string; password: string }) => {
    const user = await User.findOne({ email: payload.email }).select("+password")

    console.log('user', user)

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid user")
    }

    const isPasswordValid = await user.comparePassword(payload.password)
    if (!isPasswordValid) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password")
    }

    const token = generateToken(user)

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    }
}

const googleLogin = async (idToken: string) => {

    console.log("Backend GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID)
    // Google থেকে পাওয়া ID token verify করা
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload?.email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Google token")
    }

    // ⚠️ গুরুত্বপূর্ণ: শুধু আগে থেকে database এ থাকা admin email হলেই login হবে
    // নতুন কেউ Google দিয়ে auto-signup করতে পারবে না
    const user = await User.findOne({ email: payload.email.toLowerCase() })

    if (!user) {
        throw new ApiError(
            httpStatus.FORBIDDEN,
            "This Google account is not registered as an admin"
        )
    }

    // প্রথমবার Google দিয়ে login করলে googleId লিংক করে দাও
    if (!user.googleId) {
        user.googleId = payload.sub
        user.provider = "google"
        await user.save()
    }

    const token = generateToken(user)

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    }
}

export const AuthService = {
    loginUser,
    googleLogin,
}