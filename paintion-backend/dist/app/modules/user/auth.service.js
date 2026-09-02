"use strict";
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
exports.AuthService = void 0;
const google_auth_library_1 = require("google-auth-library");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_modal_1 = __importDefault(require("../user/user.modal"));
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.default.findOne({ email: payload.email }).select("+password");
    console.log('user', user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid user");
    }
    const isPasswordValid = yield user.comparePassword(payload.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    const token = generateToken(user);
    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
});
const googleLogin = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Backend GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    // Google থেকে পাওয়া ID token verify করা
    const ticket = yield googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!(payload === null || payload === void 0 ? void 0 : payload.email)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Google token");
    }
    // ⚠️ গুরুত্বপূর্ণ: শুধু আগে থেকে database এ থাকা admin email হলেই login হবে
    // নতুন কেউ Google দিয়ে auto-signup করতে পারবে না
    const user = yield user_modal_1.default.findOne({ email: payload.email.toLowerCase() });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This Google account is not registered as an admin");
    }
    // প্রথমবার Google দিয়ে login করলে googleId লিংক করে দাও
    if (!user.googleId) {
        user.googleId = payload.sub;
        user.provider = "google";
        yield user.save();
    }
    const token = generateToken(user);
    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
});
exports.AuthService = {
    loginUser,
    googleLogin,
};
