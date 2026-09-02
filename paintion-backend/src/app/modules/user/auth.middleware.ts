import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import httpStatus from "http-status"

const JWT_SECRET = process.env.JWT_SECRET as string

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token =
                req.cookies?.accessToken ||
                req.headers.authorization?.replace("Bearer ", "")

            if (!token) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: "You are not authorized",
                })
            }

            const decoded = jwt.verify(token, JWT_SECRET)
            ;(req as any).user = decoded
            next()
        } catch (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Invalid or expired token",
            })
        }
    }
}

export default auth