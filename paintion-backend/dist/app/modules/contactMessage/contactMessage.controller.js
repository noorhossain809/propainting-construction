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
exports.ContactMessageController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const contactMessage_service_1 = require("./contactMessage.service");
const sendEmail_1 = require("../../../helpers/sendEmail");
const escapeHtml = (value = "") => value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const buildNotificationHtml = (msg) => `
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
`;
const createMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, projectType, projectDetails } = req.body;
    // Basic required-field validation (public endpoint).
    if (!name || !phone || !email || !projectType) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Name, phone, email and project type are required",
            data: null,
        });
    }
    const result = yield contactMessage_service_1.ContactMessageService.createIntoDB({
        name,
        phone,
        email,
        projectType,
        projectDetails,
    });
    // Notify the site inbox (best-effort — never blocks the response).
    void (0, sendEmail_1.sendEmail)({
        subject: `New Quote Request from ${name}`,
        html: buildNotificationHtml({ name, phone, email, projectType, projectDetails }),
        replyTo: email,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Your message has been sent successfully",
        data: result,
    });
}));
const getAllMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactMessage_service_1.ContactMessageService.getAllFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Contact messages retrieved successfully",
        data: result,
    });
}));
const getSingleMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contactMessage_service_1.ContactMessageService.getOneByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Contact message retrieved successfully",
        data: result,
    });
}));
const updateMessageStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const result = yield contactMessage_service_1.ContactMessageService.updateStatusInDB(id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Contact message updated successfully",
        data: result,
    });
}));
const deleteMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contactMessage_service_1.ContactMessageService.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Contact message deleted successfully",
        data: result,
    });
}));
exports.ContactMessageController = {
    createMessage,
    getAllMessages,
    getSingleMessage,
    updateMessageStatus,
    deleteMessage,
};
