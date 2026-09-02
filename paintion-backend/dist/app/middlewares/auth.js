"use strict";
// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { Secret } from 'jsonwebtoken';
// import config from '../../config';
// import ApiError from '../../errors/ApiError';
// import { jwtHelpers } from '../../helpers/jwtHelpers';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const JWT_SECRET = process.env.JWT_SECRET;
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
                ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
            if (!token) {
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: "You are not authorized",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    });
};
exports.default = auth;
