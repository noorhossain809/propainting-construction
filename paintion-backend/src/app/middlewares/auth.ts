// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { Secret } from 'jsonwebtoken';
// import config from '../../config';
// import ApiError from '../../errors/ApiError';
// import { jwtHelpers } from '../../helpers/jwtHelpers';

// const auth =
//   (...requiredRoles: string[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       //get authorization token
//       const token = req.headers.authorization;
//       if (!token) {
//         throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//       }
//       // verify token
//       let verifiedUser = null;

//       verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

//       req.user = verifiedUser; // role  , userid

//       // role diye guard korar jnno
//       if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
//         throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };

// export default auth;



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