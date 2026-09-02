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
exports.TeamController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const team_service_1 = require("./team.service");
const createTeamMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const files = req.files;
    const imageFile = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0];
    if (!imageFile) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Image is required",
            data: null,
        });
    }
    const payload = Object.assign(Object.assign({}, req.body), { order: req.body.order ? Number(req.body.order) : 0, isActive: req.body.isActive === "false" ? false : true, image: {
            url: imageFile.path,
            alt: req.body.imageAlt || req.body.name || "",
        } });
    const result = yield team_service_1.TeamService.createIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Team member created successfully",
        data: result,
    });
}));
const getAllTeamMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_service_1.TeamService.getAllFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team members retrieved successfully",
        data: result,
    });
}));
const getSingleTeamMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield team_service_1.TeamService.getOneByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team member retrieved successfully",
        data: result,
    });
}));
const updateTeamMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const files = req.files;
    const payload = Object.assign({}, req.body);
    if (req.body.order !== undefined)
        payload.order = Number(req.body.order);
    if (req.body.isActive !== undefined)
        payload.isActive = req.body.isActive !== "false";
    const imageFile = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0];
    if (imageFile) {
        payload.image = {
            url: imageFile.path,
            alt: req.body.imageAlt || req.body.name || "",
        };
    }
    const result = yield team_service_1.TeamService.updateIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team member updated successfully",
        data: result,
    });
}));
const deleteTeamMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield team_service_1.TeamService.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team member deleted successfully",
        data: result,
    });
}));
exports.TeamController = {
    createTeamMember,
    getAllTeamMembers,
    getSingleTeamMember,
    updateTeamMember,
    deleteTeamMember,
};
